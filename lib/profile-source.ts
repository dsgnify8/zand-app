// One place that decides where the You page gets its data.
//
// Signed out we serve the seeded preview from constants/profile.ts, so a
// visitor sees what the page becomes rather than an empty shell. Signed
// in we serve only what that person has actually done — which for a new
// account means empty, and the screens show their own empty states.
//
// Keeping the decision here rather than in each section means the
// screens stay declarative and there is exactly one rule to reason about.

import { useAuth } from '@/lib/auth';
import { useSaved } from '@/lib/saved-store';
import { useStats } from '@/lib/stats-store';
import { useLearnProgress } from '@/lib/learn-progress';
import { useInbox } from '@/lib/inbox';
import { useFriends } from '@/lib/friends';
import { ME, READING, SAVED, FRIENDS, INBOX, STATS, FINISHED, DAYS } from '@/constants/profile';

export type ProfileData = {
  live: boolean;              // true when this is the signed-in user's own data
  me: { streak: number; freezes: number };
  reading: any[];             // pick up where you left off
  saved: any[];
  friends: any[];
  inbox: any[];
  stats: any;
  finished: any[];
  days: any[];
};

export function useProfileData(): ProfileData {
  const { session } = useAuth();
  const uid = session?.user?.id;

  // These hooks must run unconditionally — React does not allow calling
  // them behind a branch — so we always subscribe and then choose.
  const saved = useSaved();
  const stats = useStats();
  const progress = useLearnProgress();
  const { items: inbox } = useInbox(uid);
  const { accepted } = useFriends(uid);

  if (!uid) {
    return {
      live: false,
      me: { streak: ME.streak, freezes: ME.freezes },
      reading: READING,
      saved: SAVED,
      friends: FRIENDS,
      inbox: INBOX,
      stats: STATS,
      finished: FINISHED,
      days: DAYS,
    };
  }

  const st: any = stats ?? {};

  return {
    live: true,
    me: { streak: st.streakDays ?? 0, freezes: 0 },
    // most recently opened first; the store keeps them in order
    reading: (saved as any)?.recent ?? [],
    saved: (saved as any)?.saved ?? [],
    friends: accepted ?? [],
    inbox: inbox ?? [],
    stats: st,
    finished: st.finished ?? [],
    days: [],
  };
}
