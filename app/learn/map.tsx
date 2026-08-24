import { useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { STAGES, SIDE_QUESTS, type JourneyStep } from '@/constants/journey';
import { isLessonDone, journeyPosition, lessonPartial, useLearnProgress } from '@/lib/learn-progress';
import { useLevel } from '@/lib/learn-level';
import { useStrength } from '@/lib/word-strength';
import { ExpressionCard } from '@/components/expression-card';
import { Art, type ArtName } from '@/components/lang-art';
import { ReminderRow } from '@/components/reminder-row';
import { useAuth } from '@/lib/auth';
import { getLang } from '@/lib/i18n';
import { LEARN } from '@/constants/i18n/learn';
import { t as tl } from '@/lib/i18n';

// Where each level joins the route. Shown as a marker between stages.
const LEVEL_BAND: Record<string, { label: string; sub: string }> = {
  beginner:     { label: 'FROM THE BEGINNING', sub: 'Letters first. Nothing here assumes anything.' },
  elementary:   { label: 'IF YOU KNOW SOME WORDS', sub: 'Start here. Verbs are where the language opens up.' },
  intermediate: { label: 'IF YOU CAN HOLD A CONVERSATION', sub: 'Feeling, nuance, and staying afloat.' },
  advanced:     { label: 'READING AND WRITING', sub: 'Longer texts, and writing it yourself.' },
};

// one motif per chapter, cycling so neighbours never repeat
const STAGE_ART: ArtName[] = ['pen', 'tea', 'cypress', 'samovar', 'book', 'arch', 'moon', 'pomegranate', 'bird', 'medallion'];

const ICON: Record<string, string> = {
  lesson: 'chatbubble-ellipses-outline',
  alphabet: 'text-outline',
  writing: 'create-outline',
  flashcards: 'albums-outline',
  review: 'repeat-outline',
  quiz: 'help-circle-outline',
};

// how far each node sits from centre, so the path winds
const WAVE = [0, 46, 64, 46, 0, -46, -64, -46];

function stepDone(st: JourneyStep) {
  if (st.kind === 'lesson' && st.unit && st.lesson) return isLessonDone(st.unit, st.lesson);
  return false;
}

function Node({ st, index, isNext }: { st: JourneyStep; index: number; isNext: boolean }) {
  const done = stepDone(st);
  const pulse = useRef(new Animated.Value(0)).current;

  if (isNext) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ]),
    ).start();
  }
  const pct = st.unit && st.lesson ? lessonPartial(st.unit, st.lesson) : 0;
  const ring = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] });
  const ringOp = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });

  return (
    <View style={[s.nodeRow, { transform: [{ translateX: WAVE[index % WAVE.length] }] }]}>
      <Pressable onPress={() => router.replace(st.route as any)} style={s.nodeTap}>
        <View style={s.nodeWrap}>
          {isNext ? (
            <Animated.View style={[s.ring, { transform: [{ scale: ring }], opacity: ringOp }]} />
          ) : null}
          {/* A part-finished lesson gets a partial ring, so you can see
              where you stopped rather than it looking untouched. */}
          {!done && pct > 0 ? (
            <View style={[s.nodeArc, { borderTopColor: lw.gold, transform: [{ rotate: (pct * 3.6) + 'deg' }] }]} />
          ) : null}
          <View style={[s.node, done && s.nodeDone, isNext && s.nodeNext, !done && pct > 0 && s.nodeStarted]}>
            {done ? (
              <Ionicons name="checkmark" size={22} color="#FFF" />
            ) : (
              <Ionicons name={(ICON[st.kind] ?? 'ellipse-outline') as any} size={20} color={isNext ? '#FFF' : lw.green} />
            )}
          </View>
        </View>
        <View style={s.nodeText}>
          <Text style={[s.nodeT, done && s.nodeTDone]} numberOfLines={1}>{st.title}</Text>
          <Text style={s.nodeX} numberOfLines={1}>{st.sub}</Text>
        </View>
      </Pressable>
    </View>
  );
}

let lastScrollY = 0;

export default function MapScreen() {
  const { session } = useAuth();
  const jumped = useRef(false);
    const scrollRef = useRef<ScrollView>(null);
  // Where they were when they last left. Kept outside the component so
  // it survives navigating away and back, which is the whole point.
  const restored = useRef(false);
  const stageOffsets = useRef<Record<string, number>>({});
  const [pickOpen, setPickOpen] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  useLearnProgress();
  const { info } = useLevel();
  const { solid, shaky } = useStrength();

  // the first unfinished step on the route
  const flat = STAGES.flatMap((st) => st.steps);
  const pos = journeyPosition(flat);
  const next = pos.next;

  // Open on the latest thing they touched, finished or half done. Identity
  // holds because `flat` is built from the same step objects STAGES contains.
  const targetKey = pos.at ? STAGES.find((st) => st.steps.includes(pos.at))?.key : undefined;

  let n = -1;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.replace('/(tabs)/learn' as any)}>
          <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
        </Pressable>
        <Pressable hitSlop={10} onPress={() => router.replace('/learn/level' as any)}>
          <Text style={s.change}>{info ? info.name : 'set your level'}</Text>
        </Pressable>
      </View>

      {!session ? (
        <Pressable style={s.nudge} onPress={() => router.push('/onboarding?step=2' as any)}>
          <Ionicons name="cloud-upload-outline" size={12} color={lw.muted} />
          <Text style={s.nudgeT}>
            {getLang() === 'fa' ? 'برای ذخیرهٔ پیشرفتت وارد شو' : 'Sign in to track your learning'}
          </Text>
        </Pressable>
      ) : null}

      <Pressable style={s.pick} onPress={() => setPickOpen(true)}>
        <Text style={s.pickRoman}>{STAGES[activeStage]?.roman}</Text>
        <Text style={s.pickT} numberOfLines={1}>{STAGES[activeStage]?.title}</Text>
        <Ionicons name="chevron-down" size={14} color={lw.muted} />
      </Pressable>

      {pickOpen ? (
        <Pressable style={s.pickBack} onPress={() => setPickOpen(false)}>
          <ScrollView style={s.pickScroll} contentContainerStyle={s.pickSheet} showsVerticalScrollIndicator={false}>
            <Text style={s.pickHead}>{'\u0641\u0635\u0644\u200c\u0647\u0627'}</Text>
            {STAGES.map((st, i) => {
              const total = st.steps.length;
              const done = st.steps.filter((x: any) => stepDone(x)).length;
              const on = i === activeStage;
              return (
                <Pressable
                  key={st.key}
                  style={[s.pickRow, on && s.pickRowOn]}
                  onPress={() => {
                    setPickOpen(false);
                    const y = stageOffsets.current[st.key];
                    if (y !== undefined) scrollRef.current?.scrollTo({ y: Math.max(0, y - 40), animated: true });
                  }}
                >
                  <Text style={[s.pickRowRoman, on && s.pickRowRomanOn]}>{st.roman}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.pickRowT, on && s.pickRowTOn]}>{st.title}</Text>
                    <Text style={s.pickRowFa}>{st.titleFa}</Text>
                  </View>
                  <Text style={s.pickRowN}>{done}/{total}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      ) : null}

      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() => {
          // Only once per mount, and only if they had actually scrolled;
          // otherwise every layout pass would fight the user.
          if (!restored.current && lastScrollY > 40) {
            restored.current = true;
            scrollRef.current?.scrollTo({ y: lastScrollY, animated: false });
          }
        }}
        contentContainerStyle={s.body}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={120}
        onScroll={(e) => {
          lastScrollY = e.nativeEvent.contentOffset.y;
          const y = e.nativeEvent.contentOffset.y + 80;
          const entries = Object.entries(stageOffsets.current).sort((a, b) => a[1] - b[1]);
          let idx = 0;
          entries.forEach(([k, v], i) => { if (y >= v) idx = STAGES.findIndex((x) => x.key === k); });
          if (idx !== activeStage) setActiveStage(idx);
        }}
      >
        <Text style={s.eyebrow}>{tl(LEARN.yourRoute)}</Text>
        <Text style={s.title}>Persian,{'\n'}step by step</Text>
        {solid + shaky > 0 ? (
          <Text style={s.strength}>
            {solid} word{solid === 1 ? '' : 's'} solid
            {shaky > 0 ? '  ·  ' + shaky + ' still shaky' : ''}
          </Text>
        ) : null}

        {STAGES.map((stage, si) => {
          const prev = si > 0 ? STAGES[si - 1].level : undefined;
          const showBand = stage.level && stage.level !== prev;
          const band = showBand ? LEVEL_BAND[stage.level as string] : null;
          return (
          <View
            key={stage.key}
            style={[s.stage, stage.key !== 'letters' && s.stageCourse]}
            onLayout={(e) => {
              const y = e.nativeEvent.layout.y;
              stageOffsets.current[stage.key] = y;
              // Arriving from the questionnaire: scroll as soon as the stage
              // being aimed at knows its own position. Waiting on
              // onContentSizeChange meant reading these offsets before any of
              // them existed.
              if (!jumped.current && stage.key === targetKey) {
                jumped.current = true;
                restored.current = true; // and do not also restore the old position
                requestAnimationFrame(() =>
                  scrollRef.current?.scrollTo({ y: Math.max(0, y - 40), animated: false }),
                );
              }
            }}
          >
            {band ? (
              <View style={s.band}>
                <View style={s.bandRule} />
                <Text style={s.bandT}>{band.label}</Text>
                <Text style={s.bandX}>{band.sub}</Text>
                <View style={s.bandRule} />
              </View>
            ) : null}
            <View style={[s.stageHead, stage.key !== 'letters' && s.stageHeadCourse]}>
              <View style={s.stageLine} />
              <View style={s.stageLabel}>
                <Art
                  name={STAGE_ART[si % STAGE_ART.length]}
                  size={54}
                  style={{ opacity: stage.key === 'letters' ? 0.55 : 0.85, marginBottom: 2 }}
                />
                <Text style={s.stageRoman}>{stage.roman}</Text>
                <Text style={s.stageT}>{stage.title}</Text>
                <Text style={s.stageFa}>{stage.titleFa}</Text>
              </View>
              <View style={s.stageLine} />
            </View>
            <Text style={s.stageBlurb}>{stage.blurb}</Text>

            {stage.key === 'letters' ? (
              <View style={s.tiles}>
                {stage.steps.map((st) => {
                  const done = stepDone(st);
                  return (
                    <Pressable key={st.key} style={s.tile} onPress={() => router.replace(st.route as any)}>
                      <View style={[s.tileIcon, done && s.tileIconOn]}>
                        <Ionicons name={(ICON[st.kind] ?? 'ellipse-outline') as any} size={17} color={done ? '#FFF' : lw.green} />
                      </View>
                      <Text style={s.tileT} numberOfLines={2}>{st.title}</Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : [...stage.steps, {
              key: stage.key + '-check',
              kind: 'quiz' as const,
              title: 'Chapter check',
              sub: 'Ten questions on everything in this chapter',
              route: '/learn/checkpoint?stage=' + stage.key,
            }].map((st) => {
              n += 1;
              return (
                <View key={st.key}>
                  <View style={s.connector} />
                  <Node st={st} index={n} isNext={next?.key === st.key} />
                </View>
              );
            })}
          </View>
        ); })}

        <View style={s.side}>
          <Text style={s.sideLabel}>{tl(LEARN.offRoute)}</Text>
          <Text style={s.sideX}>{tl(LEARN.offRouteX)}</Text>
          <View style={s.sideList}>
            {SIDE_QUESTS.map((st) => (
              <Pressable key={st.key} style={s.sideRow} onPress={() => router.replace(st.route as any)}>
                <View style={[s.sideDot, stepDone(st) && s.sideDotOn]}>
                  {stepDone(st) ? <Ionicons name="checkmark" size={12} color="#FFF" /> : null}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.sideT}>{st.title}</Text>
                  <Text style={s.sideSub}>{st.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={15} color={lw.muted} />
              </Pressable>
            ))}
            <Pressable style={s.sideRow} onPress={() => router.replace('/learn/phrasebook' as any)}>
              <View style={s.sideDot} />
              <View style={{ flex: 1 }}>
                <Text style={s.sideT}>{tl(LEARN.phrasebook)}</Text>
                <Text style={s.sideSub}>{tl(LEARN.phrasebookCount)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={15} color={lw.muted} />
            </Pressable>
          </View>
        </View>

        <View style={s.end}>
          <Text style={s.endFa}>ادامه دارد</Text>
          <Text style={s.endT}>{tl(LEARN.moreComing)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  change: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted },

  nudge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, alignSelf: 'center', paddingHorizontal: spacing.md, paddingVertical: 5, marginBottom: 6 },
  nudgeT: { fontFamily: fonts.body, fontSize: 11, color: lw.muted },
  pick: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, alignSelf: 'center', paddingHorizontal: spacing.lg, paddingVertical: 9, borderRadius: 22, backgroundColor: lw.card, borderWidth: StyleSheet.hairlineWidth, borderColor: lw.rule, marginBottom: spacing.sm, maxWidth: 300 },
  pickRoman: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.4, color: lw.gold },
  pickT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: lw.ink, flexShrink: 1 },
  pickBack: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(20,17,14,0.35)', zIndex: 40, justifyContent: 'flex-start', paddingTop: 130, paddingHorizontal: spacing.lg },
  pickScroll: { maxHeight: 420, borderRadius: 20 },
  pickSheet: { backgroundColor: lw.bg, borderRadius: 20, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, borderWidth: StyleSheet.hairlineWidth, borderColor: lw.rule },
  pickHead: { fontFamily: fonts.persian, fontSize: 13, color: lw.muted, textAlign: 'center', marginBottom: spacing.sm },
  pickRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: 11, paddingHorizontal: spacing.md, borderRadius: 14 },
  pickRowOn: { backgroundColor: lw.card },
  pickRowRoman: { fontFamily: fonts.bodyStrong, fontSize: 11, letterSpacing: 1, color: lw.muted, width: 26 },
  pickRowRomanOn: { color: lw.gold },
  pickRowT: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: lw.ink },
  pickRowTOn: { color: lw.gold },
  pickRowFa: { fontFamily: fonts.persian, fontSize: 11.5, color: lw.muted, marginTop: 1 },
  pickRowN: { fontFamily: fonts.body, fontSize: 11, color: lw.muted },
  stageCourse: { backgroundColor: 'rgba(24,20,16,0.035)', borderRadius: 22, paddingTop: spacing.sm, paddingBottom: spacing.md, marginTop: spacing.md },
  stageHeadCourse: { marginTop: spacing.xs },
  rail: { position: 'absolute', right: 6, top: 90, bottom: 40, zIndex: 10, justifyContent: 'center', alignItems: 'center', gap: 5 },
  tick: { width: 3, height: 14, borderRadius: 2, backgroundColor: lw.greenPale },
  tickOn: { backgroundColor: lw.green, height: 20 },
  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  eyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 3, color: lw.muted },
  title: { fontFamily: fonts.body, fontSize: 34, lineHeight: 41, color: lw.green, marginTop: spacing.sm },

  band: { alignItems: 'center', marginBottom: spacing.xxl },
  bandRule: { width: 1, height: 22, backgroundColor: lw.greenPale },
  bandT: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 2.5, color: lw.green, marginVertical: spacing.sm },
  bandX: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, textAlign: 'center', marginBottom: spacing.sm, maxWidth: 260 },
  strength: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted, marginTop: spacing.sm },
  stage: { marginTop: spacing.xxl },
  stageHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  stageLine: { flex: 1, height: 1, backgroundColor: lw.hair },
  stageLabel: { alignItems: 'center' },
  stageRoman: { fontFamily: fonts.body, fontSize: 15, color: lw.greenPale },
  stageT: { fontFamily: fonts.body, fontSize: 16, color: lw.green, marginTop: 1 },
  stageFa: { fontFamily: fonts.persian, fontSize: 12, color: lw.muted, marginTop: 1 },
  stageBlurb: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted, textAlign: 'center', marginTop: spacing.sm },

  tiles: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg, justifyContent: 'center' },
  tile: { width: '30%', minWidth: 96, alignItems: 'center', backgroundColor: lw.surface, borderWidth: 1, borderColor: lw.hair, borderRadius: 14, paddingVertical: spacing.md, paddingHorizontal: spacing.sm },
  tileIcon: { width: 34, height: 34, borderRadius: 17, backgroundColor: lw.greenWash, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  tileIconOn: { backgroundColor: lw.green },
  tileT: { fontFamily: fonts.body, fontSize: 11.5, color: lw.ink, textAlign: 'center', lineHeight: 16 },
  connector: { width: 2, height: 26, backgroundColor: lw.greenPale, alignSelf: 'center', borderRadius: 1 },

  nodeRow: { alignItems: 'center' },
  nodeTap: { alignItems: 'center' },
  nodeWrap: { alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 62, height: 62, borderRadius: 31, backgroundColor: lw.greenPale },
  nodeArc: { position: 'absolute', width: 54, height: 54, borderRadius: 27, borderWidth: 3, borderColor: 'transparent' },
  nodeStarted: { borderColor: lw.gold, borderWidth: 2 },
  node: { width: 54, height: 54, borderRadius: 27, backgroundColor: lw.surface, borderWidth: 1.5, borderColor: lw.greenPale, alignItems: 'center', justifyContent: 'center' },
  nodeDone: { backgroundColor: lw.green, borderColor: lw.green },
  nodeNext: { backgroundColor: lw.green, borderColor: lw.green },
  nodeText: { alignItems: 'center', marginTop: spacing.sm, maxWidth: 200 },
  nodeT: { fontFamily: fonts.body, fontSize: 14.5, color: lw.ink },
  nodeTDone: { color: lw.inkSoft },
  nodeX: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted, marginTop: 2, textAlign: 'center' },

  side: { marginTop: spacing.xxl * 1.4, paddingTop: spacing.xl, borderTopWidth: 1, borderTopColor: lw.hair },
  sideLabel: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 2.5, color: lw.muted },
  sideX: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted, marginTop: 4 },
  sideList: { marginTop: spacing.lg },
  sideRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lw.hair },
  sideDot: { width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: lw.rule, alignItems: 'center', justifyContent: 'center' },
  sideDotOn: { backgroundColor: lw.green, borderColor: lw.green },
  sideT: { fontFamily: fonts.body, fontSize: 15, color: lw.ink },
  sideSub: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted, marginTop: 2 },

  end: { alignItems: 'center', marginTop: spacing.xxl },
  endFa: { fontFamily: fonts.persian, fontSize: 20, color: lw.greenPale },
  endT: { fontFamily: fonts.body, fontSize: 12, color: lw.muted, marginTop: 4 },
});
