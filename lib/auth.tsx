import { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAdminEmail } from '@/lib/admin';
import { pullAndMerge, syncStop, syncFlush, clearOnSignOut } from '@/lib/cloud-sync';

type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  displayName: string;
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
  updateName: (name: string) => Promise<{ error?: string }>;
  updateEmail: (email: string) => Promise<{ error?: string }>;
  updatePhone: (phone: string) => Promise<{ error?: string }>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: any }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAdminEmail(data.session?.user?.email ?? null);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { setSession(s); setAdminEmail(s?.user?.email ?? null); });
    return () => sub.subscription.unsubscribe();
  }, []);

  const user = session?.user ?? null;
  const displayName = (user?.user_metadata?.name as string) || (user?.email?.split('@')[0]) || 'there';

  // Our own emails, sent alongside whatever Supabase does. They never
  // block: a welcome that fails to send is not a reason to fail a
  // signup, and somebody sitting on a bad connection should not be told
  // their account did not work because an email did not.
  const notify = (kind: string, to: string, name?: string) => {
    supabase.functions.invoke('send-email', { body: { kind, to, name } }).catch(() => {});
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (!error) notify('welcome', email.trim(), name.trim());
    return { error: error?.message };
  };
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message };
  };
  const signOut = async () => {
    // Unregister the device first. The token row is keyed by user, and
    // leaving it behind meant this phone kept receiving notifications
    // meant for whoever was signed in last — including after somebody
    // else signed in on it.
    try {
      const uid = session?.user?.id;
      if (uid) {
        const token = await AsyncStorage.getItem('push:token');
        if (token) {
          await supabase.from('push_tokens').delete().eq('user_id', uid).eq('token', token);
        } else {
          await supabase.from('push_tokens').delete().eq('user_id', uid);
        }
      }
    } catch {}
    await supabase.auth.signOut();
  };
  const updateName = async (name: string) => {
    const { error } = await supabase.auth.updateUser({ data: { name } });
    if (!error && session?.user) { await supabase.from('profiles').update({ name }).eq('id', session.user.id); }
    return { error: error?.message };
  };
  const updateEmail = async (email: string) => {
    // this sends a confirmation link to the NEW email; change applies after they confirm
    const { error } = await supabase.auth.updateUser({ email });
    return { error: error?.message };
  };
  const updatePhone = async (phone: string) => {
    if (!session?.user) return { error: 'Not signed in' };
    const { error } = await supabase.from('profiles').update({ phone }).eq('id', session.user.id);
    if (!error) {
      await supabase.auth.updateUser({ data: { phone } });
      if (session.user.email) notify('phone-changed', session.user.email);
    }
    return { error: error?.message };
  };
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    return { error: error?.message };
  };


  // Sync. When a session appears we pull the cloud copy and merge it into
  // whatever is on this device, so a user who used the app signed out
  // keeps everything they did. When it goes away we stop syncing but
  // leave the local data alone.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const uid = session?.user?.id;
      if (uid) {
        const changed = await pullAndMerge(uid);
        // Register this device for push. Returns null in Expo Go, which
        // is fine — it will register on the first launch of a real build.
        try {
          const { registerForPush } = await import('@/lib/notif-prefs');
          registerForPush(uid);
        } catch {}
        if (changed && !cancelled) {
          // reload the stores so the UI shows what we just pulled
          try {
            // learn-level included. The pull writes learn:asked to
            // storage, but without re-reading it the level store keeps
            // whatever boot found — nothing, on a fresh install — and the
            // app asks someone to pick a level they chose months ago.
            const [{ loadLearnProgress, loadPartial }, { loadStrength }, { loadStats }, { loadSaved }, { loadLevel }] = await Promise.all([
              import('@/lib/learn-progress'),
              import('@/lib/word-strength'),
              import('@/lib/stats-store'),
              import('@/lib/saved-store'),
              import('@/lib/learn-level'),
            ]);
            await Promise.all([loadLearnProgress(), loadPartial(), loadStrength(), loadStats(), loadSaved(), loadLevel()]);
          } catch {}
        }
      } else {
        syncStop();
        // Signed out means the journey goes with the account. Clear the
        // stores, then reload them so the screens show the empty state
        // rather than keeping the old numbers in memory.
        await clearOnSignOut();
        try {
          const [{ loadLearnProgress, loadPartial }, { loadStrength }, { loadStats }, { loadSaved }, { loadLevel }] =
            await Promise.all([
              import('@/lib/learn-progress'),
              import('@/lib/word-strength'),
              import('@/lib/stats-store'),
              import('@/lib/saved-store'),
              import('@/lib/learn-level'),
            ]);
          await Promise.all([
            loadLearnProgress(), loadPartial(), loadStrength(),
            loadStats(), loadSaved(), loadLevel(),
          ]);
        } catch {}
      }
    })();
    return () => { cancelled = true; };
  }, [session?.user?.id]);

  return (
    <AuthContext.Provider value={{ session, user, loading, displayName, signUp, signIn, signOut, resetPassword, updateName, updateEmail, updatePhone }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
