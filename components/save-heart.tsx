import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useSaved } from '@/lib/saved-store';
import { useAuth } from '@/lib/auth';
import { getLang } from '@/lib/i18n';

// A small heart + bookmark pair, wired to the saved-store. Works for any
// keyed item: topics, poets, culture cards. Stops propagation so tapping
// an icon toggles without triggering a parent press.
//
// Signed out, the tap still works — what someone keeps before they have
// an account is theirs, and it migrates when they sign up. But a note
// appears once, briefly, so nobody discovers later that their saves went
// nowhere. Tapping the note goes to sign-in.
export function SaveHeart({
  itemKey, size = 18, tint = '#241C19', gap = 14,
  likeColor = '#C4433F', saveColor = '#8C6A3F',
}: {
  itemKey: string; size?: number; tint?: string; gap?: number;
  likeColor?: string; saveColor?: string;
}) {
  const { isLiked, isSaved, toggleLike, toggleSave } = useSaved();
  const { session } = useAuth();
  const [hint, setHint] = useState(false);
  const fade = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const nudge = () => {
    if (session) return;
    setHint(true);
    Animated.timing(fade, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    if (timer.current) clearTimeout(timer.current);
    // long enough to read, short enough not to sit there nagging
    timer.current = setTimeout(() => {
      Animated.timing(fade, { toValue: 0, duration: 200, useNativeDriver: true })
        .start(() => setHint(false));
    }, 2600);
  };

  const fa = getLang() === 'fa';

  return (
    <View style={styles.wrap}>
      {hint ? (
        <Animated.View style={[styles.hint, { opacity: fade }]}>
          <Pressable onPress={() => router.navigate('/onboarding?step=2' as any)}>
            <Text style={[styles.hintT, fa && styles.hintFa]}>
              {fa ? 'برای نگه داشتن، وارد شو' : 'Sign in to keep these'}
            </Text>
          </Pressable>
        </Animated.View>
      ) : null}

      <View style={[styles.row, { gap }]}>
        <Pressable
          hitSlop={8}
          onPress={(e) => { (e as any).stopPropagation?.(); toggleLike(itemKey); nudge(); }}
        >
          <Ionicons
            name={isLiked(itemKey) ? 'heart' : 'heart-outline'}
            size={size}
            color={isLiked(itemKey) ? likeColor : tint}
          />
        </Pressable>
        <Pressable
          hitSlop={8}
          onPress={(e) => { (e as any).stopPropagation?.(); toggleSave(itemKey); nudge(); }}
        >
          <Ionicons
            name={isSaved(itemKey) ? 'bookmark' : 'bookmark-outline'}
            size={size - 1}
            color={isSaved(itemKey) ? saveColor : tint}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative' },
  row: { flexDirection: 'row', alignItems: 'center' },
  hint: {
    position: 'absolute',
    bottom: '100%',
    right: 0,
    marginBottom: 6,
    backgroundColor: 'rgba(20,17,14,0.9)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 9,
  },
  hintT: { fontFamily: 'Poppins_400Regular', fontSize: 10.5, color: '#FFF' },
  hintFa: { fontFamily: 'Vazirmatn_400Regular', fontSize: 10.5 },
});
