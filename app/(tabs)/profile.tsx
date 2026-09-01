import { useCallback, useRef, useState, useEffect } from 'react';
// Aliased: react-native exports an Animated of its own and this file
// uses both. Reanimated's is only here for the library fade.
import Reanimated, { FadeIn } from 'react-native-reanimated';
import { Modal, ActivityIndicator, Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { pr, ME, READING, DISCOVER, SAVED, FRIENDS, INBOX, STATS, FINISHED, DAYS } from '@/constants/profile';
import { useSaved } from '@/lib/saved-store';
import { useProgress } from '@/lib/progress-store';
import { VideoTile } from '@/components/video-tile';
import { getLang, t, useLang } from '@/lib/i18n';
import { PROFILE } from '@/constants/i18n/profile';
import { ContinueReading } from '@/components/continue-reading';
import { useAuth } from '@/lib/auth';
import { useFriends, acceptRequest, removeFriendship } from '@/lib/friends';
import { useInbox, useOutbox, itemRoute, markLearned } from '@/lib/inbox';
import { syncNudges, cancelNudge } from '@/lib/friend-nudges';
import { FriendsSheet } from '@/components/friends-sheet';
import { FramedImage } from '@/components/framed-image';
import { CultureCover } from '@/components/culture-cover';
import { resolveMany } from '@/lib/resolve-saved';
import { storeId, debugState, useStats, milestoneStatus, setStreak } from '@/lib/stats-store';
import { AchievementsSheet } from '@/components/achievements-sheet';
import { eduImage } from '@/constants/education-images';
import { photoUrl, isBundled, bundledKey } from '@/lib/business-photos';

// Saved articles carry a bundled image key; saved businesses carry a
// storage path. Both arrive in the same list, so resolving happens here.
const libImage = (img?: string | null) => {
  if (!img) return undefined;
  if (isBundled(img)) return eduImage(bundledKey(img));
  if (img.includes('/')) return { uri: photoUrl(img) };   // storage path
  return eduImage(img);
};
import { StreakPlant } from '@/components/streak-plant';
import { SettingsSheet, AddFriendSheet, SendSheet, RenameSheet } from '@/components/profile-modals';
import { LearnProgressBlock } from '@/components/learn-progress-block';
import { StatItemsSheet, type StatItem } from '@/components/stat-items-sheet';
import { APP } from '@/constants/i18n/app';
import { SignedOutOverlay } from '@/components/signed-out-overlay';
import { BusinessCard } from '@/components/business-card';
import { EmptyState } from '@/components/empty-state';
import { useSavedBusinesses } from '@/lib/saved-businesses';
import { loadBusiness, categoryLabel } from '@/lib/businesses';
import { showDemoData } from '@/lib/demo-mode';

type Tab = 'you' | 'friends' | 'progress';

const KIND_LABEL_T: Record<string, any> = {
  word: PROFILE.aWord, topic: PROFILE.aTopic, poet: PROFILE.aPoet,
  place: PROFILE.aPlace, article: PROFILE.anArticle,
};

const KIND_LABEL: Record<string, string> = {
  word: 'a word', topic: 'a topic', poet: 'a poet', place: 'a place', article: 'a story',
};
const KIND_ICON_IN: Record<string, any> = {
  topic: 'book-outline', poet: 'book', place: 'location-outline', article: 'newspaper-outline',
};

// Everything that can be saved. The filter row lists all of them, empty or
// not, so the row says what the library is for rather than only what happens
// to be in it today.
const SAVE_KINDS = ['word', 'verse', 'topic', 'poet', 'place'] as const;


function useSavedItems() {
  // Both lists. Only `saved` was read, so anything hearted never appeared
  // here — which is why the strip looked empty for someone who had been
  // saving things all week.
  const { liked, saved } = useSaved();
  const keys = [...saved, ...liked.filter((k: string) => !saved.includes(k))];
  return resolveMany(keys);
}

const tabsFor = (): { k: Tab; label: string; icon: string }[] => [
  { k: 'you', label: t(PROFILE.you), icon: 'sparkles' },
  { k: 'friends', label: t(PROFILE.friends), icon: 'people' },
  { k: 'progress', label: t(PROFILE.progress), icon: 'leaf' },
];

/* ---------------- You ---------------- */

function StreakCard() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { user: streakUser } = useAuth();
  const realStats = useStats();
  const demo = showDemoData(streakUser?.email);
  const streakDays = demo ? ME.streak : ((realStats as any)?.streakDays ?? 0);
  return (
    <View style={s.streak}>
      <LinearGradient colors={[pr.streakA, pr.streakB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
      <View style={s.streakRow}>
        <View style={s.streakLeft}>
          <Text style={s.streakN}>{streakDays}</Text>
          <Text style={s.streakL}>{t(PROFILE.daysRow)}</Text>
          <View style={s.streakDays}>
            {(demo
              ? DAYS.slice(-7)
              // one pip per day, lit for the days inside the current run
              : Array.from({ length: 7 }, (_, i) => i >= 7 - Math.min(7, streakDays))
            ).map((d: any, i: number) => (
              <View key={i} style={[s.dayPip, d && s.dayPipOn]} />
            ))}
          </View>
          <Text style={s.streakNote}>
            {demo
              ? ME.freezes + ' rest days left this month'
              : (realStats as any)?.streakNudge
              ? t(PROFILE.streakNudge)
              : streakDays < 7 && streakDays > 0
              ? (7 - streakDays) + ' more days to your first week'
              : ''}
          </Text>
        </View>
        <StreakPlant streak={streakDays} />
      </View>
    </View>
  );
}

function KeepReading() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  return <ContinueReading label={t(PROFILE.pickUp)} />;
}
function DiscoverRow() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { recent } = useSaved();
  const day = Math.floor(Date.now() / 86400000);
  const discoverToday = (() => {
    const unseen = DISCOVER.filter((d) => !recent.includes(d.key));
    const pool = unseen.length ? unseen : DISCOVER;
    // rotate the starting point by the day, so the order changes without
    // being random — a person seeing the same card twice in a day is
    // fine, seeing it reshuffle every render is not
    const start = day % pool.length;
    return [...pool.slice(start), ...pool.slice(0, start)].slice(0, 3);
  })();

  return (
    <View style={{ marginTop: spacing.xl }}>
      <Text style={s.sectionLabel}>{t(PROFILE.notSeen)}</Text>
      <View style={{ gap: spacing.md }}>
        {/* A different three each day, drawn from the pool and skipping
            anything already opened. Same set all day so it does not
            shuffle under someone mid-scroll. */}
        {discoverToday.map((d) => {
          const src = eduImage(d.image);
          return (
            <Pressable key={d.key} style={s.disc} onPress={() => router.navigate(d.route as any)}>
              {src ? <Image source={src} style={s.discImg} resizeMode="cover" /> : <View style={[s.discImg, s.phDark]} />}
              <LinearGradient colors={[d.tint + 'E6', d.tint + '99', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill as any} />
              <View style={s.discBody}>
                <Text style={s.discKicker}>{d.kicker}</Text>
                <Text style={s.discTitle}>{d.title}</Text>
                <Text style={s.discX}>{d.x}</Text>
              </View>
              <Ionicons name="arrow-forward" size={16} color="#FFF" style={s.discArrow} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function YouTab({ onGoFriends }: { onGoFriends: () => void }) {
  // The library opens here now rather than on a tab of its own. Two cards
  // pointing at two pages did not need a third place to live.
  const [libView, setLibView] = useState<null | 'favourites' | 'saved'>(null);
  // Real things waiting: a friend request, or something sent that has
  // not been opened. Seeded items only stand in for a visitor.
  const { user: youUser } = useAuth();
  const youDemo = showDemoData(youUser?.email);
  const { incoming: youReq } = useFriends(youUser?.id);
  const { items: youInbox } = useInbox(youUser?.id);
  const pending = youDemo
    ? INBOX.filter((i) => !i.learned)
    : [
        ...(youReq ?? []).map((r: any) => ({
          kind: 'friend', from: r.profile?.name ?? 'Someone', fromFa: r.profile?.name ?? '?',
          note: 'wants to connect', done: false,
        })),
        ...(youInbox ?? []).filter((i: any) => !i.learned).map((i: any) => ({
          ...i, from: i.senderName ?? 'A friend', fromFa: i.senderName ?? '?',
        })),
      ];
  if (libView) {
    return (
      <Reanimated.View entering={FadeIn.duration(220)}>
        <LibrarySub view={libView} onBack={() => setLibView(null)} />
      </Reanimated.View>
    );
  }

  return (
    <>
      {pending.length > 0 ? (
        <Pressable style={s.alert} onPress={onGoFriends}>
          <LinearGradient colors={[pr.friendPaleA, pr.friendPaleB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
          <View style={s.alertDot} />
          <View style={{ flex: 1 }}>
            <Text style={s.alertT}>
              {pending[0].from} {t(PROFILE.sentYou)} {pending[0].kind === 'word' ? t(PROFILE.aWord) : t(PROFILE.aTopic)}
            </Text>
            {/* what actually arrived: the Persian and its meaning for a
                word, the title for anything else */}
            {(pending[0] as any).fa ? (
              <View style={s.alertWord}>
                <Text style={s.alertFa}>{(pending[0] as any).fa}</Text>
                {(pending[0] as any).tr ? <Text style={s.alertTr}>{(pending[0] as any).tr}</Text> : null}
                {(pending[0] as any).en ? <Text style={s.alertEn}>{(pending[0] as any).en}</Text> : null}
              </View>
            ) : (pending[0] as any).title ? (
              <Text style={s.alertX}>{(pending[0] as any).title}</Text>
            ) : (pending[0] as any).note ? (
              <Text style={s.alertX}>{(pending[0] as any).note}</Text>
            ) : null}
            {pending.length > 1 ? (
              <Text style={s.alertMore}>and {pending.length - 1} more waiting</Text>
            ) : null}
          </View>
          <Ionicons name="arrow-forward" size={16} color={pr.friendA} />
        </Pressable>
      ) : null}

      <StreakCard />
      <KeepReading />
      <LibrarySection onOpen={setLibView} />
      <DiscoverRow />
    </>
  );
}

function LibrarySection({ onOpen }: { onOpen: (v: 'favourites' | 'saved') => void }) {
  useLang();

  return (
    <View style={{ marginTop: spacing.xl }}>
      <Text style={s.sectionLabelInline}>{t(PROFILE.yourLibrary)}</Text>
      <View style={s.grid}>
        {[
          { key: 'favourites' as const, i: 'heart-outline', t: t(PROFILE.favourites), x: t(PROFILE.favouritesX) },
          { key: 'saved' as const, i: 'bookmark-outline', t: t(PROFILE.saveLater), x: t(PROFILE.saveLaterX) },
        ].map((g) => (
          <Pressable key={g.key} style={s.gridCell} onPress={() => onOpen(g.key)}>
            <Ionicons name={g.i as any} size={19} color={pr.saveA} />
            <Text style={s.gridT}>{g.t}</Text>
            <Text style={s.gridX}>{g.x}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function SavedStrip({ onSeeAll }: { onSeeAll: () => void }) {
  const real = useSavedItems();
  const { session } = useAuth();
  // signed out we show the seeded preview so a visitor sees the shape of
  // the page; signed in we show only what they have actually saved
  const items = session ? real : (real.length ? real : SAVED);
  if (session && items.length === 0) {
    return (
      <View style={{ marginTop: spacing.xl }}>
        <Text style={s.sectionLabelInline}>{t(PROFILE.mySaved)}</Text>
        <EmptyState
          icon="bookmark-outline"
          line="Nothing saved yet. Tap the bookmark on anything you want to keep."
          lineFa="هنوز چیزی ذخیره نکرده‌ای. روی هر چیزی که می‌خواهی نگه داری، نشان ذخیره را بزن."
          cta="Explore" ctaFa="گشت‌وگذار" to="/(tabs)/explore"
        />
      </View>
    );
  }
  return (
    <View style={{ marginTop: spacing.xl }}>
      <View style={s.labelRow}>
        <Text style={s.sectionLabelInline}>{t(PROFILE.mySaved)}</Text>
        <Pressable onPress={onSeeAll} hitSlop={8}>
          <Text style={s.seeAll}>{t(PROFILE.seeAll)} {items.length}</Text>
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.rail}>
        {items.slice(0, 4).map((it) => (
          <Pressable key={it.key} style={s.savedChip} onPress={() => (it as any).route && router.navigate((it as any).route)}>
            <Ionicons name={KIND_ICON[it.kind] as any} size={13} color={pr.saveA} />
            <Text style={s.savedChipT} numberOfLines={1}>{it.title}</Text>
            <Text style={s.savedChipX} numberOfLines={1}>{it.sub}</Text>
          </Pressable>
        ))}
        <Pressable style={s.savedMore} onPress={onSeeAll}>
          <Ionicons name="arrow-forward" size={15} color={pr.saveA} />
          <Text style={s.savedMoreT}>{t(APP.seeAll)}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

/* ---------------- Library ---------------- */

const KIND_ICON: Record<string, string> = { word: 'language-outline', topic: 'book-outline', verse: 'sparkles-outline', article: 'newspaper-outline' };

function LibrarySub({ view, onBack }: { view: 'history' | 'favourites' | 'watched' | 'saved'; onBack: () => void }) {
  const { liked, saved, recent, toggleLike } = useSaved();
  const { history } = useProgress();
  // newest-first, already ordered by the progress store
  const watchedIds = history.filter((h: any) => h.type === 'video').map((h: any) => h.id);
  const keys = view === 'favourites' ? liked : view === 'saved' ? saved : view === 'history' ? recent : [];
  const arts = resolveMany(keys);

  // Saved businesses live in their own store and come from the database
  // rather than from constants, so they are fetched and folded in here
  // instead of going through resolveMany.
  const savedBiz = useSavedBusinesses();
  const [bizCards, setBizCards] = useState<any[]>([]);
  // The rows themselves as well as the card shapes: the rail below renders
  // real listing cards, and a flattened title-and-subtitle cannot carry a
  // photo pager, a bookmark or the contact chips.
  const [bizRows, setBizRows] = useState<any[]>([]);
  // Held back until the listings arrive. Rendering the rest first and then
  // dropping a rail in is worse than a moment's wait — the page moves
  // under whatever you were about to tap.
  const [bizLoading, setBizLoading] = useState(true);
  useEffect(() => {
    if (view !== 'saved' || savedBiz.length === 0) { setBizCards([]); setBizRows([]); setBizLoading(false); return; }
    (async () => {
      const rows = await Promise.all(savedBiz.map((id) => loadBusiness(id)));
      setBizRows(rows.filter(Boolean));
      setBizCards(
        rows.filter(Boolean).map((x: any) => ({
          key: 'biz-' + x.id,
          kind: 'business',
          title: x.name,
          sub: categoryLabel(x.category, false) + (x.city ? '  ·  ' + x.city : ''),
          image: x.photos?.[0] ?? null,
          route: '/local/business?id=' + x.id,
        })),
      );
      setBizLoading(false);
    })();
  }, [view, savedBiz.join(',')]);

  const items = view === 'saved' ? [...bizCards, ...arts] : arts;

  // Saved holds one of everything the app can keep, so it reads better under
  // headings than as one long list. The headers are folded into the same
  // array as the items — a sentinel with __header rather than a nested map,
  // so there is still only one copy of the row markup below.
  const KIND_LABEL: Record<string, string> = {
    word: t(PROFILE.kindWords), verse: t(PROFILE.kindVerses), topic: t(PROFILE.kindTopics),
    poet: t(PROFILE.kindPoets), place: t(PROFILE.kindPlaces), culture: t(PROFILE.kindCulture),
    business: t(PROFILE.kindBusinesses), other: t(PROFILE.kindOther),
  };
  let rows: any[] = items;
  let groups: [string, any[]][] = [];
  if (view === 'saved') {
    const by = new Map<string, any[]>();
    items.forEach((it: any) => {
      const k = it.kind ?? 'other';
      if (!by.has(k)) by.set(k, []);
      by.get(k)!.push(it);
    });
    rows = Array.from(by).flatMap(([kind, list]) => [
      { __header: KIND_LABEL[kind] ?? kind, key: 'h-' + kind },
      ...list,
    ]);
    // Businesses first: they are the ones with somewhere else to go.
    groups = Array.from(by).sort((x, y) =>
      x[0] === 'business' ? -1 : y[0] === 'business' ? 1 : 0);
  }

  const TITLE: Record<string, string> = { history: t(PROFILE.history), favourites: t(PROFILE.favourites), watched: t(PROFILE.watched), saved: t(PROFILE.saveLater) };
  const EMPTY: Record<string, string> = {
    history: t(PROFILE.emptyHistory),
    favourites: t(PROFILE.emptyFavourites),
    watched: 'No videos watched yet.',
    saved: t(PROFILE.emptySaved),
  };

  return (
    <View>
      {/* Where you are and where you came from on one row. Stacked, the
          title read as a second heading under a first, and the eye had to
          travel twice to learn one thing. */}
      <View style={s.subHead}>
        <Pressable style={s.subBack} hitSlop={10} onPress={onBack}>
          <Ionicons name="chevron-back" size={18} color={pr.ink} />
          <Text style={s.subBackT}>{t(PROFILE.yourLibrary)}</Text>
        </Pressable>
        <Text style={s.subTitleInline}>{TITLE[view]}</Text>
      </View>

      {view === 'watched' ? (
        watchedIds.length === 0 ? (
          <View style={s.emptyWrap}>
            <Ionicons name="play-circle-outline" size={30} color={pr.dim} />
            <Text style={s.emptyT}>No videos watched yet.</Text>
          </View>
        ) : (
          <View style={s.watchGrid}>
            {watchedIds.map((id: string) => <VideoTile key={id} id={id} />)}
          </View>
        )
      ) : view === 'saved' && bizLoading ? (
        /* One spinner rather than a page that assembles itself in front of
           you. */
        <ActivityIndicator style={{ marginTop: spacing.xxl }} color={pr.saveA} />
      ) : items.length === 0 ? (
        <View style={s.emptyWrap}>
          <Ionicons name={view === 'favourites' ? 'heart-outline' : view === 'saved' ? 'bookmark-outline' : view === 'watched' ? 'play-circle-outline' : 'time-outline'} size={30} color={pr.dim} />
          <Text style={s.emptyT}>{EMPTY[view]}</Text>
        </View>
      ) : view === 'favourites' ? (
        // pinterest-style masonry-ish two-column grid with a heart top-right
        <View style={s.pinGrid}>
          {[0, 1].map((col) => (
            <View key={col} style={s.pinCol}>
              {arts.filter((_, i) => i % 2 === col).map((a) => (
                <Pressable key={a.key} style={s.pinCard} onPress={() => router.navigate(a.route as any)}>
                  <View style={[s.pinImg, { height: 130 + ((a.title.length * 7) % 90) }]}>
                    {a.kind === 'culture' && a.accent && a.glyph && !libImage(a.image) ? (
                      <CultureCover accent={a.accent} glyph={a.glyph} persian={a.persian} />
                    ) : (
                      <FramedImage name={a.image ?? a.key} source={libImage(a.image)} style={StyleSheet.absoluteFill as any}
                        onPress={() => router.navigate(a.route as any)} />
                    )}
                    <Pressable style={s.pinHeart} hitSlop={8} onPress={() => toggleLike(a.key)}>
                      <Ionicons name="heart" size={15} color="#fff" />
                    </Pressable>
                  </View>
                  <Text style={s.pinTitle} numberOfLines={2}>{a.title}</Text>
                  <Text style={s.pinMeta}>{a.sub}</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      ) : (
        /* A rail per kind rather than one long column. Saved holds one of
           everything the app can keep, and a list makes twenty words and
           two poets look like the same thing — the grouping was already
           here, it was just being drawn vertically. */
        <View>
          {groups.map(([kind, list]: any) => (
            <View key={kind} style={{ marginBottom: spacing.xl }}>
              <View style={s.railHead}>
                <Text style={[s.sectionLabel, { marginBottom: 0 }]}>
                  {KIND_LABEL[kind] ?? kind}
                  <Text style={s.railN}>{'   ' + list.length}</Text>
                </Text>
                {kind === 'business' ? (
                  <Pressable hitSlop={8} onPress={() => router.navigate('/local/saved' as any)}>
                    <Text style={s.seeAll}>{t(PROFILE.seeAll)}</Text>
                  </Pressable>
                ) : null}
              </View>

              {/* Listings get the real card, narrowed — the same one the
                  folders use. A listing reduced to a title and a thumbnail
                  loses the things that make it a listing. */}
              {kind === 'business' ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.libRail}>
                  {bizRows.map((b: any) => (
                    <BusinessCard
                      key={b.id}
                      b={b}
                      fa={getLang() === 'fa'}
                      width={244}
                      onOpen={() => router.navigate(('/local/business?id=' + b.id) as any)}
                    />
                  ))}
                </ScrollView>
              ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.libRail}>
                {list.map((a: any) => (
                  <Pressable key={a.key} style={s.libCard} onPress={() => router.navigate(a.route as any)}>
                    <View style={s.libCardImg}>
                      {a.kind === 'culture' && a.accent && a.glyph && !libImage(a.image) ? (
                        <CultureCover accent={a.accent} glyph={a.glyph} persian={a.persian} />
                      ) : (
                        <FramedImage name={a.image ?? a.key} source={libImage(a.image)} style={StyleSheet.absoluteFill as any}
                          onPress={() => router.navigate(a.route as any)} />
                      )}
                    </View>
                    <Text style={s.libCardT} numberOfLines={2}>{a.title}</Text>
                    <Text style={s.libCardS} numberOfLines={1}>{a.sub}</Text>
                  </Pressable>
                ))}
              </ScrollView>
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function FriendsTab() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { user } = useAuth();
  const { accepted, incoming, loading: friendsLoading, refresh } = useFriends(user?.id);
  const { items: inbox, refresh: refreshInbox } = useInbox(user?.id);
  const { items: outbox, refresh: refreshOutbox } = useOutbox(user?.id);

  // Keep the pending nudges in step with what is actually unlearned.
  // Cheap, idempotent, and the inbox is the only place that knows.
  useEffect(() => { syncNudges(inbox); }, [inbox]);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [sendTo, setSendTo] = useState<{ name: string; id: string } | null>(null);

  // Which cards have been answered, and which one opened the sheet. The
  // send happens elsewhere, so the row that started it has to be
  // remembered until the sheet reports back.
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  // Everything sent, behind a sheet. Five on the page is a reminder;
  // forty is a filing cabinet.
  const [sentOpen, setSentOpen] = useState(false);

  const hasFriends = accepted.length > 0;
  const hasActivity = hasFriends || inbox.length > 0;

  // Nothing until the friends fetch lands. The sections below each render
  // from their own list, so without this the tab assembles itself in front
  // of you — which is what the flash was when switching from Progress.
  if (friendsLoading) {
    return <ActivityIndicator style={{ marginTop: spacing.xxl }} color={pr.friendA} />;
  }

  return (
    <>
      {/* The pitch only shows to someone who has nobody yet. With
          friends and things arriving, the page leads with those. */}
      {/* Wait for the fetch. An empty list mid-load is not the same as
          having nobody, and showing the pitch on that flashes it at people
          who do have friends. */}
      {!hasActivity && !friendsLoading ? (
        <>
          <View style={s.frHero}>
            <LinearGradient colors={[pr.friendPaleA, pr.friendPaleB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
            <Text style={s.frHeroFa}>بفرست</Text>
            <Text style={s.frHeroT}>{t(PROFILE.teachEachOther)}</Text>
            <Text style={s.frHeroX}>Send a friend anything worth learning: a word, a poet, a place, a story. They learn it, then send one back.</Text>
          </View>

          <Pressable style={s.frMainBtn} onPress={() => setFriendsOpen(true)}>
            <Ionicons name="person-add" size={17} color="#FFF" />
            <Text style={s.frMainBtnT}>{t(PROFILE.findFriends)}</Text>
          </Pressable>
        </>
      ) : null}

      {/* Real incoming requests (always live) */}
      {incoming.length > 0 ? (
        <>
          <Text style={s.sectionLabel}>{t(PROFILE.requests)}</Text>
          <View style={{ gap: spacing.sm }}>
            {incoming.map((r) => (
              <View key={r.id} style={s.friendRow}>
                <View style={[s.avatar, s.avatarSm]}><Text style={s.avatarT}>{(r.profile.name || '?')[0].toUpperCase()}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.friendN}>{r.profile.name}</Text>
                  <Text style={s.friendL}>{t(PROFILE.wantsConnect)}</Text>
                </View>
                <Pressable style={s.acceptBtn} onPress={async () => { await acceptRequest(r.id); refresh(); }}>
                  <Text style={s.acceptT}>{t(PROFILE.accept)}</Text>
                </Pressable>
                <Pressable hitSlop={8} onPress={async () => { await removeFriendship(r.id); refresh(); }}>
                  <Ionicons name="close" size={16} color={pr.dim} />
                </Pressable>
              </View>
            ))}
          </View>
        </>
      ) : null}

      {/* Real inbox: things friends actually sent me */}
      {inbox.some((it) => !it.learned || !it.answered) ? (
        <>
          <Text style={s.sectionLabel}>{t(PROFILE.waitingForYou)}</Text>
          <View style={{ gap: spacing.md }}>
            {/* Learned but unanswered stays. Marking something learned is
                half the exchange; the card leaves when you have sent one
                back. */}
            {inbox.filter((it) => !it.learned || !it.answered).map((it) => (
              <Pressable
                key={it.id}
                style={[s.inbox, it.learned && s.inboxDone]}
                onPress={() => {
                  // A word is its own card; everything else has a page.
                  const to = itemRoute(it);
                  if (to) router.navigate(to as any);
                }}
              >
                <View style={s.inboxTop}>
                  <View style={s.avatar}><Text style={s.avatarT}>{(it.senderName || '?')[0].toUpperCase()}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.inboxFrom}>{it.senderName} {t(PROFILE.sentYou)} {KIND_LABEL_T[it.kind] ? t(KIND_LABEL_T[it.kind]) : t(PROFILE.something)}</Text>
                    {/* When, under who. Something that arrived two hours
                        ago and something from last week are different
                        things, and the card said neither. */}
                    {it.created_at ? (
                      /* The local timeAgo takes a timestamp, not an ISO
                         string — hence NaN. Parsed here rather than
                         changing a helper a dozen other places use. */
                      <Text style={s.inboxWhen}>{timeAgo(Date.parse(it.created_at))}</Text>
                    ) : null}
                  </View>
                  {it.learned ? <Ionicons name="checkmark-circle" size={19} color={pr.streakA} /> : <View style={s.newDot} />}
                </View>
                <View style={s.inboxCard}>
                  {it.kind === 'word' ? (
                    <>
                      {it.fa ? <Text style={s.wordFa}>{it.fa}</Text> : null}
                      {it.tr ? <Text style={s.wordTr}>{it.tr}</Text> : null}
                      <View style={s.wordRule} />
                      {it.en ? <Text style={s.wordEn}>{it.en}</Text> : null}
                    </>
                  ) : (
                    <>
                      <Ionicons name={KIND_ICON_IN[it.kind] ?? 'sparkles'} size={20} color={pr.friendA} />
                      <Text style={[s.wordTr, { marginTop: 8 }]}>{it.title}</Text>
                      {/* What it is, under what it is called. A title alone
                          told you nothing about why it had been sent. */}
                      {it.en ? (
                        <>
                          <View style={s.wordRule} />
                          <Text style={s.wordEn}>{it.en}</Text>
                        </>
                      ) : null}
                    </>
                  )}
                </View>
                {it.note ? <Text style={s.inboxNote}>“{it.note}”</Text> : null}
                {it.learned ? (
                  <Pressable
                    style={s.sendBack}
                    onPress={() => {
                      setReplyingTo(it.id);
                      setSendTo({ name: it.senderName ?? '', id: it.sender });
                    }}
                  >
                    <Ionicons name="arrow-undo" size={13} color={pr.friendA} />
                    <Text style={s.sendBackT}>{t(PROFILE.sendBack)}</Text>
                  </Pressable>
                ) : (
                  <Pressable style={s.complete} onPress={async () => { await markLearned(it.id); await cancelNudge(it.id); refreshInbox(); }}>
                    <Text style={s.completeT}>{t(PROFILE.markLearned)}</Text>
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                  </Pressable>
                )}
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {/* Your side of it: what you sent, and whether it landed. */}
      {hasFriends ? (
        <>
          <View style={s.peopleRow}>
            <Text style={[s.sectionLabel, { marginTop: 0 }]}>{t(PROFILE.yourPeople)}</Text>
            <Pressable hitSlop={10} onPress={() => setFriendsOpen(true)} style={s.plus}>
              <Ionicons name="add" size={16} color={pr.friendA} />
            </Pressable>
          </View>
          <View style={{ gap: spacing.sm }}>
            {accepted.map((r) => (
              <Pressable key={r.id} style={s.friendRow} onPress={() => setSendTo({ name: r.profile.name, id: r.profile.id })}>
                <View style={[s.avatar, s.avatarSm]}><Text style={s.avatarT}>{(r.profile.name || '?')[0].toUpperCase()}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.friendN}>{r.profile.name}</Text>
                  <Text style={s.friendL}>{t(APP.tapToSend)}</Text>
                </View>
                <Ionicons name="paper-plane-outline" size={16} color={pr.friendA} />
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {outbox.length > 0 ? (
        <>
          <View style={s.sentHead}>
            <Text style={[s.sectionLabel, { marginBottom: 0 }]}>{t(PROFILE.yourSends)}</Text>
            {outbox.length > 5 ? (
              <Pressable hitSlop={8} onPress={() => setSentOpen(true)}>
                <Text style={s.seeAll}>{t(PROFILE.seeAll)}</Text>
              </Pressable>
            ) : null}
          </View>
          <View style={{ gap: spacing.sm }}>
            {outbox.slice(0, 5).map((it) => (
              <Pressable
                key={'out-' + it.id}
                style={s.friendRow}
                onPress={() => {
                  const to = itemRoute(it);
                  if (to) router.navigate(to as any);
                }}
              >
                <View style={[s.avatar, s.avatarSm]}>
                  <Text style={s.avatarT}>{(it.recipientName || '?')[0].toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.friendN} numberOfLines={1}>
                    {it.fa || it.title || t(PROFILE.something)}
                  </Text>
                  <Text style={s.friendL}>
                    {it.learned
                      ? (it.recipientName ?? '') + ' ' + t(PROFILE.theyLearnedIt)
                      : t(PROFILE.sentWaiting) + ' ' + (it.recipientName ?? '')}
                  </Text>
                </View>
                <Ionicons
                  name={it.learned ? 'checkmark-circle' : 'time-outline'}
                  size={17}
                  color={it.learned ? pr.streakA : pr.dim}
                />
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {/* Real accepted friends (if any) */}
      {/* Preview of what the page becomes — locked when you have no friends,
          shown as a labelled example once you do. */}
      <View style={hasActivity ? undefined : s.previewWrap} pointerEvents={hasActivity ? 'auto' : 'none'}>
        {hasActivity ? null : (
          <Text style={s.sectionLabel}>{t(PROFILE.aPreview)}</Text>
        )}
        <View style={{ gap: spacing.md, opacity: hasActivity ? 1 : 0.9 }}>
          {(hasActivity && !showDemoData(user?.email)
              ? []
              : showDemoData(user?.email)
              ? INBOX.filter((x) => x.kind === 'word')
              : (inbox ?? []).filter((x: any) => x.kind === 'word')
            ).slice(0, 1).map((i: any) => (
            <View key={i.key ?? i.id ?? 'inbox'} style={s.inbox}>
              <View style={s.inboxTop}>
                <View style={s.avatar}><Text style={s.avatarT}>{((i.fromFa || i.from || i.senderName || '?') as string)[0]}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.inboxFrom}>{i.from || i.senderName || 'A friend'} {t(PROFILE.sentYou)} {KIND_LABEL_T[i.kind] ? t(KIND_LABEL_T[i.kind]) : t(PROFILE.something)}</Text>
                  <Text style={s.inboxWhen}>{i.when || ''}</Text>
                </View>
                <View style={s.newDot} />
              </View>
              <View style={s.inboxCard}>
                {i.kind === 'word' ? (
                  <>
                    <Text style={s.wordFa}>{i.fa}</Text>
                    <Text style={s.wordTr}>{i.tr}</Text>
                    <View style={s.wordRule} />
                    <Text style={s.wordEn}>{i.en}</Text>
                    <Text style={s.wordUse}>A word to slip into your next conversation.</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name={KIND_ICON_IN[i.kind] ?? 'sparkles'} size={20} color={pr.friendA} />
                    <Text style={[s.wordTr, { marginTop: 6 }]}>{i.title}</Text>
                  </>
                )}
              </View>
              <Text style={s.inboxNote}>“{i.note}”</Text>
            </View>
          ))}
          {/* A preview of what this becomes, shown only when nobody is
              signed in. Real friends render above, from `accepted`. */}
          <View style={{ gap: spacing.sm }}>
            {(user ? [] : FRIENDS.slice(0, 2)).map((f) => (
              <View key={f.key} style={s.friendRow}>
                <View style={[s.avatar, s.avatarSm]}><Text style={s.avatarT}>{f.persian[0]}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.friendN}>{f.name}</Text>
                  <Text style={s.friendL}>{f.last}</Text>
                </View>
                <View style={s.friendStreak}>
                  <Ionicons name="leaf" size={11} color={pr.streakA} />
                  <Text style={s.friendStreakT}>{f.streak}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

      </View>

      {/* Everything ever sent, scrollable. The page shows five as a
          reminder of the exchange; this is the record. */}
      <Modal visible={sentOpen} transparent animationType="slide" onRequestClose={() => setSentOpen(false)}>
        <Pressable style={s.sheetBack} onPress={() => setSentOpen(false)} />
        <View style={s.sheetBody}>
        <Text style={s.sheetHead}>{t(PROFILE.yourSends)}</Text>
        <ScrollView style={{ maxHeight: 420 }} showsVerticalScrollIndicator={false}>
          <View style={{ gap: spacing.sm, paddingBottom: spacing.xl }}>
            {outbox.map((it) => (
              <Pressable
                key={'all-' + it.id}
                style={s.friendRow}
                onPress={() => {
                  setSentOpen(false);
                  const to = itemRoute(it);
                  if (to) router.navigate(to as any);
                }}
              >
                <View style={[s.avatar, s.avatarSm]}>
                  <Text style={s.avatarT}>{(it.recipientName || '?')[0].toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.friendN} numberOfLines={1}>
                    {it.fa || it.title || t(PROFILE.something)}
                  </Text>
                  <Text style={s.friendL} numberOfLines={1}>
                    {it.recipientName}{it.learned ? '  ·  ' + t(PROFILE.theyLearnedIt) : ''}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        </View>
      </Modal>

      <SendSheet
        open={sendTo !== null}
        replyTo={replyingTo}
        onClose={() => {
          // The send itself records what it answered, so closing only has
          // to ask the inbox again. Backing out without sending leaves the
          // card exactly where it was, which is correct.
          setReplyingTo(null);
          setSendTo(null);
          refreshInbox();
        }} to={sendTo?.name ?? ''} toId={sendTo?.id} />
      <FriendsSheet open={friendsOpen} onClose={() => { setFriendsOpen(false); refresh(); }} />
    </>
  );
}


function timeAgo(at: number) {
  const d = Math.floor((Date.now() - at) / 86400000);
  if (d <= 0) return 'today';
  if (d === 1) return 'yesterday';
  if (d < 7) return d + ' days ago';
  if (d < 30) return Math.floor(d / 7) + 'w ago';
  return Math.floor(d / 30) + 'mo ago';
}

function ProgressTab() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const stats = useStats();
  const [showAllFinished, setShowAllFinished] = useState(false);
  const [achvOpen, setAchvOpen] = useState(false);
  const miles = milestoneStatus(stats);
  const unlocked = miles.filter((m) => m.achieved).length;
  const { user: progUser } = useAuth();
  const progStats = useStats();
  const progDemo = showDemoData(progUser?.email);
  const progStreak = progDemo ? ME.streak : ((progStats as any)?.streakDays ?? 0);
  const ps: any = progStats ?? {};
  const realProgStats = [
    { v: String(ps.lessonsFinished ?? 0), k: 'lessons finished' },
    { v: String(ps.wordsSolid ?? 0), k: 'words solid' },
    { v: String(ps.topicsFinished ?? 0), k: 'topics read' },
    { v: String(ps.thingsSaved ?? 0), k: 'things saved' },
    { v: String(ps.learnDays ?? 0), k: 'days learning' },
  ];
  useEffect(() => { setStreak(progStreak); }, [progStreak]);
  // What sits behind each number. Only the counters that actually record
  // what they counted can offer a list — pages read and things sent are
  // totals with nothing itemised behind them.
  const savedItems = useSavedItems();
  const [statSheet, setStatSheet] = useState<{ title: string; items: StatItem[] } | null>(null);

  const fromFinished = (prefix: string): StatItem[] =>
    (stats.finished ?? [])
      .filter((f: any) => f.key.startsWith(prefix))
      .map((f: any) => ({ key: f.key, title: f.title, sub: f.sub, route: f.route, meta: timeAgo(f.at) }));

  return (
    <>
      <View style={s.progHero}>
        <LinearGradient colors={[pr.streakA, pr.streakB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
        <StreakPlant streak={progStreak} size={1.25} />
        <Text style={s.progN}>{progStreak} days</Text>
        <Text style={s.progX}>{progDemo ? t(PROFILE.longestRun) + ' ' + ME.longest : ((progStats as any)?.streakNudge ? t(PROFILE.streakNudge) : progStreak > 0 ? t(PROFILE.longestRun) + ' ' + progStreak : '')}</Text>
      </View>

      <Text style={s.sectionLabel}>{t(APP.yourPersian)}</Text>
      <LearnProgressBlock />

      <Text style={s.sectionLabel}>{t(PROFILE.whatDoing)}</Text>
      <View style={s.statGrid}>
        {[
          // Everything under Explore. Poets were counted separately and
          // also inside this, so the two numbers overlapped and neither
          // answered "how much have I read".
          {
            v: (stats.topicsFinished ?? 0) + ((stats as any).poetsRead ?? 0),
            k: 'Topics finished', kT: PROFILE.topicsFinished, i: 'book',
            items: () => [...fromFinished('topic-'), ...fromFinished('poet-'), ...fromFinished('culture-')],
          },
          { v: stats.pagesRead, k: 'Pages read', kT: PROFILE.pagesRead, i: 'document-text' },
          // Everything kept, and a tap rather than a hold: this one has a
          // page of its own to go to.
          // Everything kept, listed here rather than routed: the saved
          // page lives inside the You tab's own state, so there is no
          // address to send anyone to.
          {
            v: stats.thingsSaved, k: 'Things saved', kT: PROFILE.thingsSaved, i: 'bookmark',
            items: () => savedItems.map((x: any) => ({ key: x.key, title: x.title, sub: x.sub, route: x.route })),
          },
          { v: stats.thingsSent, k: 'Sent to friends', kT: PROFILE.sentToFriends, i: 'paper-plane' },
        ].map((st: any) => {
          // Only the ones with something itemised behind them open.
          const list = st.items ? st.items() : [];
          const holdable = !!st.items && list.length > 0;
          return (
            <Pressable
              key={st.k}
              style={s.statCell}
              disabled={!holdable && !st.route}
              delayLongPress={280}
              onPress={st.route ? () => router.navigate(st.route as any) : undefined}
              onLongPress={holdable ? () => setStatSheet({ title: st.kT ? t(st.kT) : st.k, items: list }) : undefined}
            >
              <Ionicons name={st.i as any} size={16} color="#A65F42" />
              <Text style={s.statV}>{st.v}</Text>
              <Text style={s.statK}>{st.kT ? t(st.kT) : st.k}</Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable style={s.achvCard} onPress={() => setAchvOpen(true)}>
        <View style={s.achvIcon}><Ionicons name="trophy" size={18} color="#8A6D1F" /></View>
        <View style={{ flex: 1 }}>
          <Text style={s.achvT}>{t(PROFILE.achievements)}</Text>
          <Text style={s.achvX}>{unlocked} of {miles.length} unlocked{unlocked > 0 ? '  ·  nice work' : ''}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={pr.dim} />
      </Pressable>


      <AchievementsSheet open={achvOpen} onClose={() => setAchvOpen(false)} />
      <StatItemsSheet
        open={!!statSheet}
        title={statSheet?.title ?? ''}
        items={statSheet?.items ?? []}
        onClose={() => setStatSheet(null)}
      />
    </>
  );
}

/* ---------------- The page ---------------- */

export default function Profile() {
  // Subscribe to the language. Without this the screen only re-renders
  // when something else pushes it, so a switch made elsewhere does not
  // reach it until you navigate away and back.
  useLang();
  const { displayName, session } = useAuth();
  const { tab: wantTab } = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<Tab>((wantTab as Tab) || 'you');
  const [settings, setSettings] = useState(false);
  // A dot means something is genuinely waiting: a friend request, or
  // something sent that has not been opened. Seeded demo data must not
  // light it up, or the badge stops meaning anything.
  const { user: me } = useAuth();
  const { incoming: pendReq } = useFriends(me?.id);
  const { items: pendInbox } = useInbox(me?.id);
  const pending = me
    // `learned`, not `done` — SentItem has no `done` field, so the old
    // check was !undefined and every item stayed pending forever.
    ? (pendReq?.length ?? 0) + (pendInbox ?? []).filter((i: any) => !i.learned).length
    : 0;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.header}>
        <View>
          <Text style={s.hello}>{t(PROFILE.welcome)}</Text>
          <Text style={s.name}>{displayName}</Text>
        </View>
        <Pressable hitSlop={10} onPress={() => setSettings(true)}>
          <Ionicons name="settings-outline" size={21} color={colors.textPrimary} />
        </Pressable>
      </View>

      <View style={s.tabs}>
        {tabsFor().map((tb) => {
          const on = tb.k === tab;
          return (
            <Pressable key={tb.k} style={[s.tab, on && s.tabOn]} onPress={() => setTab(tb.k)}>
              <Ionicons name={(tb.icon + (on ? '' : '-outline')) as any} size={15} color={on ? colors.surface : pr.dim} />
              <Text style={[s.tabT, on && s.tabTOn]}>{tb.label}</Text>
              {tb.k === 'friends' && pending > 0 && !on ? <View style={s.badge} /> : null}
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
        {tab === 'you' ? <YouTab onGoFriends={() => setTab('friends')} /> : null}
        {tab === 'friends' ? <FriendsTab /> : null}
        {tab === 'progress' ? <ProgressTab /> : null}
      </ScrollView>

      <SettingsSheet open={settings} onClose={() => setSettings(false)} />
      {!session ? <SignedOutOverlay /> : null}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  watchGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  wordUse: { fontFamily: fonts.body, fontSize: 12, color: pr.dim, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },
  previewWrap: { position: 'relative', marginTop: spacing.sm },
  previewOverlay: { marginBottom: spacing.lg },
  previewCard: { backgroundColor: '#FFF', borderRadius: 18, borderWidth: 1, borderColor: pr.hair, padding: spacing.lg, alignItems: 'center', marginHorizontal: spacing.md, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 5 },
  previewT: { fontFamily: fonts.heading, fontSize: 18, color: pr.ink, marginTop: spacing.sm, textAlign: 'center' },
  previewX: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 19, color: pr.dim, textAlign: 'center', marginTop: 6 },
  previewBtn: { flexDirection: 'row', alignItems: 'center', gap: 7, backgroundColor: pr.friendA, borderRadius: 20, paddingVertical: spacing.sm, paddingHorizontal: spacing.xl, marginTop: spacing.lg },
  previewBtnT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: '#FFF' },
  frMainBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, backgroundColor: pr.friendA, borderRadius: 24, paddingVertical: spacing.md, marginTop: spacing.lg },
  frMainBtnT: { fontFamily: fonts.bodyStrong, fontSize: 14, color: '#FFF' },
  frBadge: { position: 'absolute', right: spacing.lg, backgroundColor: '#C4433F', borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  frBadgeT: { fontFamily: fonts.bodyStrong, fontSize: 11, color: '#FFF' },
  acceptBtn: { backgroundColor: pr.friendA, borderRadius: 16, paddingVertical: 6, paddingHorizontal: spacing.md },
  acceptT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: '#FFF' },
  friendEmpty: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: pr.dim, paddingVertical: spacing.md },
  achvCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: '#FBF3DC', borderRadius: 14, borderWidth: 1, borderColor: '#E7CE8E', padding: spacing.lg, marginTop: spacing.xl },
  achvIcon: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#F0DEA8', alignItems: 'center', justifyContent: 'center' },
  achvT: { fontFamily: fonts.heading, fontSize: 17, color: '#6E571A' },
  achvX: { fontFamily: fonts.body, fontSize: 11.5, color: '#8A6D1F', marginTop: 1 },
  mileRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: pr.hair, padding: spacing.md },
  mileRowOn: { backgroundColor: '#FBF3DC', borderColor: '#E7CE8E' },
  mileIcon: { width: 30, height: 30, borderRadius: 15, backgroundColor: pr.hair, alignItems: 'center', justifyContent: 'center' },
  mileIconOn: { backgroundColor: '#F0DEA8' },
  mileT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: pr.ink },
  mileTOn: { color: '#6E571A' },
  mileTag: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.5, color: '#8A6D1F', marginTop: 3 },
  mileTrack: { height: 4, borderRadius: 2, backgroundColor: pr.hair, marginTop: 6, overflow: 'hidden' },
  mileFill: { height: 4, borderRadius: 2, backgroundColor: pr.streakA },
  mileN: { fontFamily: fonts.bodyStrong, fontSize: 12, color: pr.dim },
  mileNOn: { color: '#8A6D1F' },
  finHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl },
  finEmpty: { fontFamily: fonts.body, fontSize: 13, color: pr.dim, paddingVertical: spacing.lg },
  subBack: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: spacing.md },
  subBackT: { fontFamily: fonts.body, fontSize: 14, color: pr.ink },
  subTitle: { fontFamily: fonts.heading, fontSize: 28, color: pr.ink, marginBottom: spacing.lg },
  emptyWrap: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xxl * 1.5 },
  emptyT: { fontFamily: fonts.body, fontSize: 13, color: pr.dim, textAlign: 'center', paddingHorizontal: spacing.xl, lineHeight: 20 },
  pinGrid: { flexDirection: 'row', gap: spacing.md },
  pinCol: { flex: 1, gap: spacing.md },
  pinCard: {},
  pinImg: { borderRadius: 14, overflow: 'hidden', backgroundColor: pr.hair },
  pinHeart: { position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center' },
  pinTitle: { fontFamily: fonts.heading, fontSize: 15, lineHeight: 19, color: pr.ink, marginTop: spacing.sm },
  pinMeta: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.2, color: pr.dim, marginTop: 3 },
  saveThumb: { width: 54, height: 54, borderRadius: 10, overflow: 'hidden', backgroundColor: pr.hair },
  safe: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.md },
  hello: { fontFamily: fonts.body, fontSize: 12, color: pr.dim },
  name: { fontFamily: fonts.heading, fontSize: 30, color: colors.textPrimary },

  tabs: { flexDirection: 'row', marginHorizontal: spacing.lg, backgroundColor: 'rgba(36,28,25,0.05)', borderRadius: 11, padding: 3, gap: 3 },
  tab: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 7, borderRadius: 8 },
  tabOn: { backgroundColor: colors.textPrimary },
  tabT: { fontFamily: fonts.bodyStrong, fontSize: 11, color: pr.dim },
  tabTOn: { color: colors.surface },
  badge: { position: 'absolute', top: 5, right: 9, width: 6, height: 6, borderRadius: 3, backgroundColor: pr.readA },

  container: { padding: spacing.lg, paddingBottom: spacing.xxl * 2.4 },
  peopleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl, marginBottom: spacing.sm },
  plus: { width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(0,0,0,0.05)', alignItems: 'center', justifyContent: 'center' },
  alertWord: { marginTop: 6 },
  alertFa: { fontFamily: fonts.persian, fontSize: 20, color: pr.ink },
  alertTr: { fontFamily: fonts.body, fontSize: 12, color: pr.dim, marginTop: 1 },
  alertEn: { fontFamily: fonts.bodyStrong, fontSize: 13, color: pr.ink, marginTop: 3 },
  alertMore: { fontFamily: fonts.body, fontSize: 11.5, color: pr.dim, marginTop: 5 },
  sectionLabel: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: pr.dim, marginTop: spacing.xl, marginBottom: spacing.md },
  phDark: { backgroundColor: 'rgba(36,28,25,0.25)' },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  sectionLabelInline: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: pr.dim },
  sentHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  sheetBack: { flex: 1, backgroundColor: 'rgba(20,16,12,0.4)' },
  sheetBody: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xxl,
  },
  sheetHead: { fontFamily: fonts.heading, fontSize: 19, color: colors.textPrimary, marginBottom: spacing.lg },
  seeAll: { fontFamily: fonts.bodyStrong, fontSize: 10.5, color: pr.saveA },
  savedChip: { width: 132, backgroundColor: colors.surface, borderRadius: 11, borderWidth: 1, borderColor: pr.hair, padding: spacing.md, gap: 3 },
  savedChipT: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.textPrimary },
  savedChipX: { fontFamily: fonts.body, fontSize: 9.5, color: pr.dim },
  savedMore: { width: 96, alignItems: 'center', justifyContent: 'center', gap: 4, borderRadius: 11, borderWidth: 1, borderStyle: 'dashed', borderColor: pr.hair },
  savedMoreT: { fontFamily: fonts.bodyStrong, fontSize: 10.5, color: pr.saveA },
  chipsTight: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  friendNRow: { flexDirection: 'row', alignItems: 'baseline', gap: 5 },
  friendReal: { fontFamily: fonts.body, fontSize: 9.5, color: pr.dim },
  told: { fontFamily: fonts.body, fontSize: 10.5, color: pr.streakA, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },

  alert: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, padding: spacing.lg, borderRadius: 13, overflow: 'hidden', marginBottom: spacing.md },
  alertDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: pr.friendA },
  alertT: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: '#241C19' },
  alertX: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(36,28,25,0.65)', marginTop: 1 },

  streak: { borderRadius: 15, overflow: 'hidden', padding: spacing.lg },
  streakRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  streakLeft: { flex: 1 },
  streakN: { fontFamily: fonts.heading, fontSize: 46, color: '#FFF', lineHeight: 50 },
  streakL: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 2, color: 'rgba(255,255,255,0.8)' },
  streakDays: { flexDirection: 'row', gap: 4, marginTop: spacing.md },
  dayPip: { width: 16, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.28)' },
  dayPipOn: { backgroundColor: '#FFF' },
  streakNote: { fontFamily: fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: spacing.sm },

  rail: { gap: spacing.md, paddingRight: spacing.lg },
  readCard: { width: 148, height: 196, borderRadius: 13, overflow: 'hidden', backgroundColor: colors.surface, justifyContent: 'flex-end' },
  readImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  readBody: { padding: spacing.md },
  readTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: '#FFF' },
  readSub: { fontFamily: fonts.body, fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 1 },
  readTrack: { height: 2, borderRadius: 1, backgroundColor: 'rgba(255,255,255,0.28)', marginTop: spacing.sm },
  readFill: { height: 2, borderRadius: 1, backgroundColor: '#E0C079' },
  readPct: { fontFamily: fonts.body, fontSize: 9, color: 'rgba(255,255,255,0.65)', marginTop: 4 },

  disc: { height: 104, borderRadius: 13, overflow: 'hidden', justifyContent: 'center' },
  discImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  discBody: { paddingHorizontal: spacing.lg, paddingRight: 46 },
  discKicker: { fontFamily: fonts.bodyStrong, fontSize: 7.5, letterSpacing: 1.5, color: 'rgba(255,255,255,0.85)' },
  discTitle: { fontFamily: fonts.heading, fontSize: 21, color: '#FFF', marginTop: 2 },
  discX: { fontFamily: fonts.body, fontSize: 11, lineHeight: 16, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  discArrow: { position: 'absolute', right: spacing.lg },

  libHero: { borderRadius: 15, overflow: 'hidden', padding: spacing.xl, alignItems: 'center' },
  libN: { fontFamily: fonts.heading, fontSize: 44, color: '#FFF' },
  libL: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 2, color: 'rgba(255,255,255,0.8)' },
  libX: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: spacing.sm, textAlign: 'center' },
  chips: { flexDirection: 'row', gap: spacing.sm, marginVertical: spacing.lg },
  chip: { paddingVertical: 5, paddingHorizontal: spacing.md, borderRadius: 20, borderWidth: 1, borderColor: pr.hair },
  chipOn: { backgroundColor: pr.saveA, borderColor: pr.saveA },
  chipT: { fontFamily: fonts.bodyStrong, fontSize: 11, color: pr.dim, textTransform: 'capitalize' },
  chipTOn: { color: '#FFF' },
  saveRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 11, borderWidth: 1, borderColor: pr.hair, padding: spacing.md },
  saveIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(62,110,120,0.1)', alignItems: 'center', justifyContent: 'center' },
  saveT: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  saveS: { fontFamily: fonts.body, fontSize: 11, color: pr.dim, marginTop: 1 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.md },
  // A warm wash rather than flat surface. These two are the way into
  // everything anyone has kept, and a plain bordered box did not read as
  // worth opening.
  gridCell: {
    width: '47%', borderRadius: 14, padding: spacing.lg, gap: 5,
    backgroundColor: 'rgba(65,114,112,0.07)',
    borderWidth: StyleSheet.hairlineWidth, borderColor: 'rgba(65,114,112,0.16)',
  },
  gridT: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  gridX: { fontFamily: fonts.body, fontSize: 10, color: pr.dim },

  frHero: { borderRadius: 15, overflow: 'hidden', padding: spacing.xl, alignItems: 'center' },
  frHeroFa: { fontFamily: fonts.persian, fontSize: 30, color: pr.friendA },
  frHeroT: { fontFamily: fonts.heading, fontSize: 26, color: '#241C19', marginTop: 2 },
  frHeroX: { fontFamily: fonts.body, fontSize: 12, lineHeight: 19, color: 'rgba(36,28,25,0.68)', marginTop: spacing.sm, textAlign: 'center' },
  inbox: { backgroundColor: colors.surface, borderRadius: 13, borderWidth: 1, borderColor: pr.hair, padding: spacing.lg },
  inboxDone: { opacity: 0.62 },
  inboxTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(65,114,112,0.14)', alignItems: 'center', justifyContent: 'center' },
  avatarSm: { width: 30, height: 30, borderRadius: 15 },
  avatarT: { fontFamily: fonts.persian, fontSize: 15, color: pr.friendA },
  inboxFrom: { fontFamily: fonts.bodyStrong, fontSize: 12.5, color: colors.textPrimary },
  inboxWhen: { fontFamily: fonts.body, fontSize: 10, color: pr.dim },
  newDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: pr.friendA },
  // Horizontal padding as well as vertical: an article title runs to two
  // or three lines and was touching both edges.
  inboxCard: {
    alignItems: 'center', backgroundColor: 'rgba(65,114,112,0.08)',
    borderRadius: 10, paddingVertical: spacing.lg, paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  wordFa: { fontFamily: fonts.persian, fontSize: 28, color: pr.friendA },
  wordTr: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 26, color: colors.textPrimary, marginTop: 2, textAlign: 'center' },
  wordRule: { width: 20, height: 1, backgroundColor: pr.friendA, opacity: 0.5, marginVertical: spacing.sm },
  wordEn: { fontFamily: fonts.body, fontSize: 12, color: pr.dim, fontStyle: 'italic', textAlign: 'center' },
  inboxKindTag: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.5, color: pr.friendA, marginTop: 4 },
  inboxNote: { fontFamily: fonts.body, fontSize: 11.5, color: pr.dim, fontStyle: 'italic', textAlign: 'center', marginTop: spacing.md },
  complete: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: pr.friendA, borderRadius: 20, paddingVertical: 9, marginTop: spacing.md },
  completeT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: '#FFF' },
  sendBack: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, borderWidth: 1, borderColor: pr.friendA, borderRadius: 20, paddingVertical: 8, marginTop: spacing.md },
  sendBackT: { fontFamily: fonts.bodyStrong, fontSize: 11.5, color: pr.friendA },
  friendRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 11, borderWidth: 1, borderColor: pr.hair, padding: spacing.md },
  friendN: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  friendL: { fontFamily: fonts.body, fontSize: 10.5, color: pr.dim },
  friendStreak: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(110,140,90,0.12)', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  friendStreakT: { fontFamily: fonts.bodyStrong, fontSize: 11, color: pr.streakA },
  addFriend: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, borderWidth: 1, borderStyle: 'dashed', borderColor: pr.hair, borderRadius: 11, paddingVertical: spacing.md },
  addFriendT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: pr.friendA },

  progHero: { borderRadius: 15, overflow: 'hidden', padding: spacing.xl, alignItems: 'center' },
  progN: { fontFamily: fonts.heading, fontSize: 34, color: '#FFF', marginTop: spacing.md },
  progX: { fontFamily: fonts.body, fontSize: 11.5, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  calRow: { flexDirection: 'row', gap: 4, justifyContent: 'space-between' },
  calPip: { flex: 1, height: 34, borderRadius: 5, backgroundColor: 'rgba(36,28,25,0.07)' },
  calPipOn: { backgroundColor: pr.streakA },
  statGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginTop: spacing.xl },
  // A warm ground rather than a flat panel, and the icon in clay rather
  // than the blue it borrowed from the save colour.
  statCell: { width: '47%', backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: pr.hair, padding: spacing.lg },
  statV: { fontFamily: fonts.heading, fontSize: 28, color: colors.textPrimary },
  statK: { fontFamily: fonts.bodyStrong, fontSize: 11, color: colors.textPrimary, marginTop: 2 },
  statS: { fontFamily: fonts.body, fontSize: 10, color: pr.dim, marginTop: 1 },
  doneRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 11, borderWidth: 1, borderColor: pr.hair, padding: spacing.md },
  doneTick: { width: 22, height: 22, borderRadius: 11, backgroundColor: pr.streakA, alignItems: 'center', justifyContent: 'center' },
  doneT: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.textPrimary },
  doneS: { fontFamily: fonts.body, fontSize: 10.5, color: pr.dim },
  doneW: { fontFamily: fonts.body, fontSize: 10, color: pr.dim },
  libHead: {
    flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  libHeadT: { fontFamily: fonts.heading, fontSize: 26, color: pr.text },
  subHead: {
    flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  // The body face, matching the page titles on By city and By category.
  // The serif made a one word heading look like a chapter opening.
  subTitleInline: { fontFamily: fonts.body, fontSize: 16, letterSpacing: 0.2, color: pr.text },
  railHead: {
    flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  railN: { fontFamily: fonts.body, fontSize: 10.5, color: pr.dim },
  libRail: { gap: spacing.md, paddingRight: spacing.lg },
  libCard: { width: 132 },
  libCardImg: {
    width: 132, height: 168, borderRadius: 12, overflow: 'hidden',
    backgroundColor: 'rgba(40,28,24,0.05)',
  },
  libCardT: { fontFamily: fonts.heading, fontSize: 15, lineHeight: 19, color: pr.text, marginTop: 7 },
  libCardS: { fontFamily: fonts.body, fontSize: 11, color: pr.dim, marginTop: 1 },
  inboxWhen: { fontFamily: fonts.body, fontSize: 11.5, color: pr.dim, marginTop: 2 },
  inboxNote: {
    fontFamily: fonts.body, fontSize: 13, fontStyle: 'italic',
    color: pr.dim, textAlign: 'center', marginTop: spacing.md,
  },
});
