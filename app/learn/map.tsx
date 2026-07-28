import { useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { STAGES, SIDE_QUESTS, type JourneyStep } from '@/constants/journey';
import { isLessonDone, useLearnProgress } from '@/lib/learn-progress';
import { useLevel } from '@/lib/learn-level';

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
  const ring = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.18] });
  const ringOp = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] });

  return (
    <View style={[s.nodeRow, { transform: [{ translateX: WAVE[index % WAVE.length] }] }]}>
      <Pressable onPress={() => router.navigate(st.route as any)} style={s.nodeTap}>
        <View style={s.nodeWrap}>
          {isNext ? (
            <Animated.View style={[s.ring, { transform: [{ scale: ring }], opacity: ringOp }]} />
          ) : null}
          <View style={[s.node, done && s.nodeDone, isNext && s.nodeNext]}>
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

export default function MapScreen() {
  useLearnProgress();
  const { info } = useLevel();

  // the first unfinished step on the route
  const flat = STAGES.flatMap((st) => st.steps);
  const next = flat.find((st) => !stepDone(st));

  let n = -1;

  return (
    <SafeAreaView style={s.safe} edges={['top']}>
      <View style={s.top}>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color={lw.inkSoft} />
        </Pressable>
        <Pressable hitSlop={10} onPress={() => router.navigate('/learn/level' as any)}>
          <Text style={s.change}>{info ? info.name : 'set your level'}</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={s.body} showsVerticalScrollIndicator={false}>
        <Text style={s.eyebrow}>YOUR ROUTE</Text>
        <Text style={s.title}>Persian,{'\n'}step by step</Text>

        {STAGES.map((stage) => (
          <View key={stage.key} style={s.stage}>
            <View style={s.stageHead}>
              <View style={s.stageLine} />
              <View style={s.stageLabel}>
                <Text style={s.stageRoman}>{stage.roman}</Text>
                <Text style={s.stageT}>{stage.title}</Text>
                <Text style={s.stageFa}>{stage.titleFa}</Text>
              </View>
              <View style={s.stageLine} />
            </View>
            <Text style={s.stageBlurb}>{stage.blurb}</Text>

            {stage.steps.map((st) => {
              n += 1;
              return (
                <View key={st.key}>
                  <View style={s.connector} />
                  <Node st={st} index={n} isNext={next?.key === st.key} />
                </View>
              );
            })}
          </View>
        ))}

        <View style={s.side}>
          <Text style={s.sideLabel}>OFF THE ROUTE</Text>
          <Text style={s.sideX}>Useful whenever you want them. Not required.</Text>
          <View style={s.sideList}>
            {SIDE_QUESTS.map((st) => (
              <Pressable key={st.key} style={s.sideRow} onPress={() => router.navigate(st.route as any)}>
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
            <Pressable style={s.sideRow} onPress={() => router.navigate('/learn/phrasebook' as any)}>
              <View style={s.sideDot} />
              <View style={{ flex: 1 }}>
                <Text style={s.sideT}>Phrasebook</Text>
                <Text style={s.sideSub}>Fifty things worth being able to say</Text>
              </View>
              <Ionicons name="chevron-forward" size={15} color={lw.muted} />
            </Pressable>
          </View>
        </View>

        <View style={s.end}>
          <Text style={s.endFa}>ادامه دارد</Text>
          <Text style={s.endT}>More stages are being written</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lw.bg },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  change: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted },

  body: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl },
  eyebrow: { fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 3, color: lw.muted },
  title: { fontFamily: fonts.body, fontSize: 34, lineHeight: 41, color: lw.green, marginTop: spacing.sm },

  stage: { marginTop: spacing.xxl },
  stageHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  stageLine: { flex: 1, height: 1, backgroundColor: lw.hair },
  stageLabel: { alignItems: 'center' },
  stageRoman: { fontFamily: fonts.body, fontSize: 15, color: lw.greenPale },
  stageT: { fontFamily: fonts.body, fontSize: 16, color: lw.green, marginTop: 1 },
  stageFa: { fontFamily: fonts.persian, fontSize: 12, color: lw.muted, marginTop: 1 },
  stageBlurb: { fontFamily: fonts.body, fontSize: 12.5, color: lw.muted, textAlign: 'center', marginTop: spacing.sm },

  connector: { width: 2, height: 26, backgroundColor: lw.greenPale, alignSelf: 'center', borderRadius: 1 },

  nodeRow: { alignItems: 'center' },
  nodeTap: { alignItems: 'center' },
  nodeWrap: { alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 62, height: 62, borderRadius: 31, backgroundColor: lw.greenPale },
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
