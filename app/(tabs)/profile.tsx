import { useRef, useState, useEffect } from 'react';
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { pr, ME, READING, DISCOVER, SAVED, FRIENDS, INBOX, STATS, FINISHED, DAYS } from '@/constants/profile';
import { useSaved } from '@/lib/saved-store';
import { useProgress } from '@/lib/progress-store';
import { VideoTile } from '@/components/video-tile';
import { t, useLang } from '@/lib/i18n';
import { PROFILE } from '@/constants/i18n/profile';
import { ContinueReading } from '@/components/continue-reading';
import { useAuth } from '@/lib/auth';
import { useFriends, acceptRequest, removeFriendship } from '@/lib/friends';
import { useInbox, markLearned } from '@/lib/inbox';
import { FriendsSheet } from '@/components/friends-sheet';
import { FramedImage } from '@/components/framed-image';
import { CultureCover } from '@/components/culture-cover';
import { ARTICLES } from '@/constants/articles';
import { resolveMany } from '@/lib/resolve-saved';
import { useStats, milestoneStatus, setStreak } from '@/lib/stats-store';
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
import { APP } from '@/constants/i18n/app';
import { SignedOutOverlay } from '@/components/signed-out-overlay';
import { EmptyState } from '@/components/empty-state';
import { useSavedBusinesses } from '@/lib/saved-businesses';
import { loadBusiness, categoryLabel } from '@/lib/businesses';

type Tab = 'you' | 'library' | 'friends' | 'progress';

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


function useSavedItems() {
  const { saved } = useSaved();
  return resolveMany(saved);
}

const tabsFor = (): { k: Tab; label: string; icon: string }[] => [
  { k: 'you', label: t(PROFILE.you), icon: 'sparkles' },
  { k: 'library', label: t(PROFILE.library), icon: 'bookmark' },
  { k: 'friends', label: t(PROFILE.friends), icon: 'people' },
  { k: 'progress', label: t(PROFILE.progress), icon: 'leaf' },
];

/* ---------------- You ---------------- */

function StreakCard() {
  return (
    <View style={s.streak}>
      <LinearGradient colors={[pr.streakA, pr.streakB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
      <View style={s.streakRow}>
        <View style={s.streakLeft}>
          <Text style={s.streakN}>{ME.streak}</Text>
          <Text style={s.streakL}>{t(PROFILE.daysRow)}</Text>
          <View style={s.streakDays}>
            {DAYS.slice(-7).map((d, i) => (
              <View key={i} style={[s.dayPip, d && s.dayPipOn]} />
            ))}
          </View>
          <Text style={s.streakNote}>{ME.freezes} rest days left this month</Text>
        </View>
        <StreakPlant streak={ME.streak} />
      </View>
    </View>
  );
}

function KeepReading() {
  return <ContinueReading label={t(PROFILE.pickUp)} />;
}
function DiscoverRow() {
  return (
    <View style={{ marginTop: spacing.xl }}>
      <Text style={s.sectionLabel}>{t(PROFILE.notSeen)}</Text>
      <View style={{ gap: spacing.md }}>
        {DISCOVER.map((d) => {
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

function YouTab({ onGoFriends, onGoLibrary }: { onGoFriends: () => void; onGoLibrary: () => void }) {
  const pending = INBOX.filter((i) => !i.done);
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
            <Text style={s.alertX}>
              {pending.length > 1 ? 'and ' + (pending.length - 1) + ' more waiting' : pending[0].note}
            </Text>
          </View>
          <Ionicons name="arrow-forward" size={16} color={pr.friendA} />
        </Pressable>
      ) : null}

      <StreakCard />
      <KeepReading />
      <SavedStrip onSeeAll={onGoLibrary} />
      <DiscoverRow />
    </>
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
  useEffect(() => {
    if (view !== 'saved' || savedBiz.length === 0) { setBizCards([]); return; }
    (async () => {
      const rows = await Promise.all(savedBiz.map((id) => loadBusiness(id)));
      setBizCards(
        rows.filter(Boolean).map((x: any) => ({
          key: 'biz-' + x.id,
          kind: 'business',
          title: x.name,
          sub: categoryLabel(x.category, false) + (x.city ? '  ·  ' + x.city : ''),
          image: x.photos?.[0] ?? null,
          route: '/business?id=' + x.id,
        })),
      );
    })();
  }, [view, savedBiz.join(',')]);

  const items = view === 'saved' ? [...bizCards, ...arts] : arts;

  const TITLE: Record<string, string> = { history: t(PROFILE.history), favourites: t(PROFILE.favourites), watched: t(PROFILE.watched), saved: t(PROFILE.saveLater) };
  const EMPTY: Record<string, string> = {
    history: 'Nothing opened yet. Start reading and it shows up here.',
    favourites: 'No favourites yet. Tap the heart on anything you love.',
    watched: 'No videos watched yet.',
    saved: 'Nothing saved yet. Tap the bookmark to keep something for later.',
  };

  return (
    <View>
      <Pressable style={s.subBack} hitSlop={10} onPress={onBack}>
        <Ionicons name="chevron-back" size={20} color={pr.ink} />
        <Text style={s.subBackT}>{t(PROFILE.yourLibrary)}</Text>
      </Pressable>
      <Text style={s.subTitle}>{TITLE[view]}</Text>

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
                <Pressable key={a.key} style={s.pinCard} onPress={() => router.navigate(('/article?article=' + a.key) as any)}>
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
        <View style={{ gap: spacing.sm }}>
          {items.map((a) => (
            <Pressable key={a.key} style={s.saveRow} onPress={() => router.navigate(a.route as any)}>
              <View style={s.saveThumb}>
                {a.kind === 'culture' && a.accent && a.glyph && !libImage(a.image) ? (
                  <CultureCover accent={a.accent} glyph={a.glyph} persian={a.persian} />
                ) : (
                  <FramedImage name={a.image ?? a.key} source={libImage(a.image)} style={StyleSheet.absoluteFill as any}
                    onPress={() => router.navigate(a.route as any)} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.saveT} numberOfLines={2}>{a.title}</Text>
                <Text style={s.saveS}>{a.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={15} color={pr.dim} />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

function LibraryTab() {
  const items = useSavedItems();
  const [filter, setFilter] = useState<'all' | 'article' | 'word' | 'topic' | 'verse'>('all');
  const [libView, setLibView] = useState<null | 'history' | 'favourites' | 'watched' | 'saved'>(null);
  const list = filter === 'all' ? items : items.filter((x) => x.kind === filter);

  if (libView) return <LibrarySub view={libView} onBack={() => setLibView(null)} />;

  return (
    <>
      <View style={s.libHero}>
        <LinearGradient colors={[pr.saveA, pr.saveB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
        <Text style={s.libN}>{items.length}</Text>
        <Text style={s.libL}>{t(PROFILE.thingsKept)}</Text>
        <Text style={s.libX}>Everything you tapped save on, in one place.</Text>
      </View>

      <Text style={s.sectionLabel}>{t(PROFILE.yourLibrary)}</Text>
      <View style={s.grid}>
        {[
          { key: 'history', i: 'time-outline', t: t(PROFILE.history), x: t(PROFILE.historyX) },
          { key: 'favourites', i: 'heart-outline', t: t(PROFILE.favourites), x: t(PROFILE.favouritesX) },
          { key: 'watched', i: 'play-circle-outline', t: t(PROFILE.watched), x: t(PROFILE.watchedX) },
          { key: 'saved', i: 'bookmark-outline', t: t(PROFILE.saveLater), x: t(PROFILE.saveLaterX) },
        ].map((g) => (
          <Pressable key={g.key} style={s.gridCell} onPress={() => setLibView(g.key)}>
            <Ionicons name={g.i as any} size={19} color={pr.saveA} />
            <Text style={s.gridT}>{g.t}</Text>
            <Text style={s.gridX}>{g.x}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={s.sectionLabel}>{t(PROFILE.mySaved)}</Text>
      <View style={s.chipsTight}>
        {(['all', 'article', 'word', 'verse', 'topic'] as const).map((f) => (
          <Pressable key={f} style={[s.chip, filter === f && s.chipOn]} onPress={() => setFilter(f)}>
            <Text style={[s.chipT, filter === f && s.chipTOn]}>{f === 'all' ? 'All' : f + 's'}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ gap: spacing.sm }}>
        {list.map((it) => (
          <Pressable key={it.key} style={s.saveRow} onPress={() => (it as any).route && router.navigate((it as any).route)}>
            <View style={s.saveIcon}>
              <Ionicons name={KIND_ICON[it.kind] as any} size={15} color={pr.saveA} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.saveT} numberOfLines={1}>{it.title}</Text>
              <Text style={s.saveS}>{it.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={15} color={pr.dim} />
          </Pressable>
        ))}
      </View>

    </>
  );
}

/* ---------------- Friends ---------------- */

function FriendsTab() {
  const { user } = useAuth();
  const { accepted, incoming, refresh } = useFriends(user?.id);
  const { items: inbox, refresh: refreshInbox } = useInbox(user?.id);
  const [friendsOpen, setFriendsOpen] = useState(false);
  const [sendTo, setSendTo] = useState<{ name: string; id: string } | null>(null);

  const hasFriends = accepted.length > 0;
  const hasActivity = hasFriends || inbox.length > 0;

  return (
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
        {incoming.length > 0 ? (<View style={s.frBadge}><Text style={s.frBadgeT}>{incoming.length}</Text></View>) : null}
      </Pressable>

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
      {inbox.length > 0 ? (
        <>
          <Text style={s.sectionLabel}>{t(PROFILE.waitingForYou)}</Text>
          <View style={{ gap: spacing.md }}>
            {inbox.map((it) => (
              <View key={it.id} style={[s.inbox, it.learned && s.inboxDone]}>
                <View style={s.inboxTop}>
                  <View style={s.avatar}><Text style={s.avatarT}>{(it.senderName || '?')[0].toUpperCase()}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.inboxFrom}>{it.senderName} {t(PROFILE.sentYou)} {KIND_LABEL_T[it.kind] ? t(KIND_LABEL_T[it.kind]) : t(PROFILE.something)}</Text>
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
                      <Text style={[s.wordTr, { marginTop: 6 }]}>{it.title}</Text>
                    </>
                  )}
                </View>
                {it.note ? <Text style={s.inboxNote}>“{it.note}”</Text> : null}
                {it.learned ? (
                  <Pressable style={s.sendBack} onPress={() => setSendTo({ name: it.senderName ?? '', id: it.sender })}>
                    <Ionicons name="arrow-undo" size={13} color={pr.friendA} />
                    <Text style={s.sendBackT}>{t(PROFILE.sendBack)}</Text>
                  </Pressable>
                ) : (
                  <Pressable style={s.complete} onPress={async () => { await markLearned(it.id); refreshInbox(); }}>
                    <Text style={s.completeT}>{t(PROFILE.markLearned)}</Text>
                    <Ionicons name="checkmark" size={14} color="#FFF" />
                  </Pressable>
                )}
              </View>
            ))}
          </View>
        </>
      ) : null}

      {/* Real accepted friends (if any) */}
      {hasFriends ? (
        <>
          <Text style={s.sectionLabel}>{t(PROFILE.yourPeople)}</Text>
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

      {/* Preview of what the page becomes — locked when you have no friends,
          shown as a labelled example once you do. */}
      <View style={hasActivity ? undefined : s.previewWrap} pointerEvents={hasActivity ? 'auto' : 'none'}>
        <Text style={s.sectionLabel}>{hasActivity ? t(PROFILE.exampleSend) : t(PROFILE.aPreview)}</Text>
        <View style={{ gap: spacing.md, opacity: hasActivity ? 1 : 0.9 }}>
          {INBOX.filter((x) => x.kind === 'word').slice(0, 1).map((i) => (
            <View key={i.key} style={s.inbox}>
              <View style={s.inboxTop}>
                <View style={s.avatar}><Text style={s.avatarT}>{i.fromFa[0]}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.inboxFrom}>{i.from} {t(PROFILE.sentYou)} {KIND_LABEL_T[i.kind] ? t(KIND_LABEL_T[i.kind]) : t(PROFILE.something)}</Text>
                  <Text style={s.inboxWhen}>{i.when}</Text>
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

      <SendSheet open={sendTo !== null} onClose={() => setSendTo(null)} to={sendTo?.name ?? ''} toId={sendTo?.id} />
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
  const stats = useStats();
  const [showAllFinished, setShowAllFinished] = useState(false);
  const [achvOpen, setAchvOpen] = useState(false);
  const miles = milestoneStatus(stats);
  const unlocked = miles.filter((m) => m.achieved).length;
  useEffect(() => { setStreak(ME.streak); }, []);
  const finished = stats.finished;
  const shown = showAllFinished ? finished : finished.slice(0, 10);

  return (
    <>
      <View style={s.progHero}>
        <LinearGradient colors={[pr.streakA, pr.streakB]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill as any} />
        <StreakPlant streak={ME.streak} size={1.25} />
        <Text style={s.progN}>{ME.streak} days</Text>
        <Text style={s.progX}>Longest you have ever gone: {ME.longest}</Text>
      </View>

      <Text style={s.sectionLabel}>{t(APP.yourPersian)}</Text>
      <LearnProgressBlock />

      <Text style={s.sectionLabel}>{t(PROFILE.whatDoing)}</Text>
      <View style={s.statGrid}>
        {[
          { v: stats.topicsFinished, k: 'Topics finished', kT: PROFILE.topicsFinished, i: 'book' },
          { v: stats.articlesRead, k: 'Articles read', kT: PROFILE.articlesRead, i: 'newspaper' },
          { v: stats.pagesRead, k: 'Pages read', kT: PROFILE.pagesRead, i: 'document-text' },
          { v: stats.videosWatched, k: 'Videos watched', kT: PROFILE.videosWatched, i: 'play-circle' },
          { v: stats.thingsSaved, k: 'Things saved', kT: PROFILE.thingsSaved, i: 'bookmark' },
          { v: stats.thingsSent, k: 'Sent to friends', kT: PROFILE.sentToFriends, i: 'paper-plane' },
        ].map((st) => (
          <View key={st.k} style={s.statCell}>
            <Ionicons name={st.i as any} size={16} color={pr.saveA} />
            <Text style={s.statV}>{st.v}</Text>
            <Text style={s.statK}>{st.kT ? t(st.kT) : st.k}</Text>
          </View>
        ))}
      </View>

      <Pressable style={s.achvCard} onPress={() => setAchvOpen(true)}>
        <View style={s.achvIcon}><Ionicons name="trophy" size={18} color="#8A6D1F" /></View>
        <View style={{ flex: 1 }}>
          <Text style={s.achvT}>{t(PROFILE.achievements)}</Text>
          <Text style={s.achvX}>{unlocked} of {miles.length} unlocked{unlocked > 0 ? '  ·  nice work' : ''}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={pr.dim} />
      </Pressable>

      <View style={s.finHead}>
        <Text style={s.sectionLabel}>{t(PROFILE.finished)}</Text>
        {finished.length > 10 ? (
          <Pressable hitSlop={8} onPress={() => setShowAllFinished((v) => !v)}>
            <Text style={s.seeAll}>{showAllFinished ? t(PROFILE.showLess) : t(PROFILE.seeAll) + ' ' + finished.length}</Text>
          </Pressable>
        ) : null}
      </View>
      {finished.length === 0 ? (
        <Text style={s.finEmpty}>Finish a topic or an article and it lands here.</Text>
      ) : (
        <View style={{ gap: spacing.sm }}>
          {shown.map((f) => (
            <Pressable key={f.key} style={s.doneRow} onPress={() => f.route && router.navigate(f.route as any)}>
              <View style={s.doneTick}><Ionicons name="checkmark" size={12} color="#FFF" /></View>
              <View style={{ flex: 1 }}>
                <Text style={s.doneT} numberOfLines={1}>{f.title}</Text>
                <Text style={s.doneS}>{f.sub}</Text>
              </View>
              <Text style={s.doneW}>{timeAgo(f.at)}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <AchievementsSheet open={achvOpen} onClose={() => setAchvOpen(false)} />
    </>
  );
}

/* ---------------- The page ---------------- */

export default function Profile() {
  const { displayName, session } = useAuth();
  const { tab: wantTab } = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<Tab>((wantTab as Tab) || 'you');
  const [settings, setSettings] = useState(false);
  const pending = INBOX.filter((i) => !i.done).length;

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
        {tabsFor().map((t) => {
          const on = t.k === tab;
          return (
            <Pressable key={t.k} style={[s.tab, on && s.tabOn]} onPress={() => setTab(t.k)}>
              <Ionicons name={(t.icon + (on ? '' : '-outline')) as any} size={15} color={on ? colors.surface : pr.dim} />
              <Text style={[s.tabT, on && s.tabTOn]}>{t.label}</Text>
              {t.k === 'friends' && pending > 0 && !on ? <View style={s.badge} /> : null}
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
        {tab === 'you' ? <YouTab onGoFriends={() => setTab('friends')} onGoLibrary={() => setTab('library')} /> : null}
        {tab === 'library' ? <LibraryTab /> : null}
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

  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  sectionLabel: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: pr.dim, marginTop: spacing.xl, marginBottom: spacing.md },
  phDark: { backgroundColor: 'rgba(36,28,25,0.25)' },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  sectionLabelInline: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: pr.dim },
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
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  gridCell: { width: '47%', backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: pr.hair, padding: spacing.lg, gap: 5 },
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
  inboxCard: { alignItems: 'center', backgroundColor: 'rgba(65,114,112,0.08)', borderRadius: 10, paddingVertical: spacing.lg, marginTop: spacing.md },
  wordFa: { fontFamily: fonts.persian, fontSize: 28, color: pr.friendA },
  wordTr: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary, marginTop: 2 },
  wordRule: { width: 20, height: 1, backgroundColor: pr.friendA, opacity: 0.5, marginVertical: spacing.sm },
  wordEn: { fontFamily: fonts.body, fontSize: 12, color: pr.dim, fontStyle: 'italic' },
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
  statCell: { width: '47%', backgroundColor: colors.surface, borderRadius: 12, borderWidth: 1, borderColor: pr.hair, padding: spacing.lg },
  statV: { fontFamily: fonts.heading, fontSize: 28, color: colors.textPrimary },
  statK: { fontFamily: fonts.bodyStrong, fontSize: 11, color: colors.textPrimary, marginTop: 2 },
  statS: { fontFamily: fonts.body, fontSize: 10, color: pr.dim, marginTop: 1 },
  doneRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: colors.surface, borderRadius: 11, borderWidth: 1, borderColor: pr.hair, padding: spacing.md },
  doneTick: { width: 22, height: 22, borderRadius: 11, backgroundColor: pr.streakA, alignItems: 'center', justifyContent: 'center' },
  doneT: { fontFamily: fonts.heading, fontSize: fontSize.base, color: colors.textPrimary },
  doneS: { fontFamily: fonts.body, fontSize: 10.5, color: pr.dim },
  doneW: { fontFamily: fonts.body, fontSize: 10, color: pr.dim },
});
