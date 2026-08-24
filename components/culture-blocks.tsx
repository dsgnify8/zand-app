import { useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, spacing } from '@/constants/zand-theme';
import { cu, TYPICAL_CARDS, typicalDeck } from '@/constants/culture';

const W = Dimensions.get('window').width;

/* ---------- The taarof simulator ---------- */

type Round = { host: string; fa: string; real: boolean };

const ROUNDS: Round[] = [
  { host: 'Please, take it. It is worthless. Be my guest.', hostFa: 'خواهش می‌کنم، بردارید. قابل شما را ندارد.', fa: 'قابل نداره', real: false },
  { host: 'No, truly, I insist. Take it.', hostFa: 'نه، جدی می‌گویم. اصرار می‌کنم. بردارید.', fa: 'خواهش می‌کنم', real: false },
  { host: 'I will be offended. Please. Take it.', hostFa: 'به من برمی‌خورد. خواهش می‌کنم. بردارید.', fa: 'تعارف نکن', real: true },
];

export function TaarofSim() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [step, setStep] = useState(0);
  const [ending, setEnding] = useState<null | 'greedy' | 'perfect' | 'lost'>(null);
  const shake = useRef(new Animated.Value(0)).current;

  const round = ROUNDS[Math.min(step, 2)];

  const accept = () => {
    if (step < 2) {
      setEnding('greedy');
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    } else {
      setEnding('perfect');
    }
  };

  const refuse = () => {
    if (step < 2) setStep(step + 1);
    else setEnding('lost');
  };

  const reset = () => { setStep(0); setEnding(null); };

  const sx = shake.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] });

  if (ending) {
    const map = {
      greedy: { c: cu.pomegranate, t: 'Too soon.', tFa: 'زود بود.', x: 'You accepted on offer ' + (step + 1) + '. The first offers are not real, and everyone at the table now knows you were waiting for it. The host is smiling. The host is not pleased.', fa: 'تعارف شمارهٔ ' + (step + 1) + ' را قبول کردی. تعارف‌های اول واقعی نیستند، و حالا همهٔ کسانی که سر سفره‌اند می‌دانند که منتظرش بودی. میزبان لبخند می‌زند. میزبان راضی نیست.' },
      perfect: { c: cu.pistachio, t: 'Correct.', tFa: 'درست بود.', x: 'Three refusals, then acceptance on the third genuine offer. Nobody was exposed, nobody was refused, and everybody got exactly what they wanted. This is the whole machine working.', fa: 'سه بار رد کردی، و بعد تعارف سومِ واقعی را پذیرفتی. آبروی کسی نرفت، به کسی نه گفته نشد، و همه دقیقاً همان چیزی را گرفتند که می‌خواستند. این یعنی تمام آن دستگاه، درست کار کرده.' },
      lost: { c: cu.saffron, t: 'You overdid it.', tFa: 'زیاده‌روی کردی.', x: 'The third offer was real and you refused it. The host has withdrawn it, because you have now insisted, and they have to take you at your word. You wanted it. You do not have it.', fa: 'تعارف سوم واقعی بود و تو ردش کردی. میزبان پسش گرفت، چون تو اصرار کردی و او ناچار است حرفت را باور کند. می‌خواستی‌اش. و حالا نداری‌اش.' },
    }[ending];
    return (
      <View style={[styles.simWrap, { borderColor: map.c }]}>
        <Text style={[styles.simVerdict, { color: map.c }]}>{fa && (map as any).tFa ? (map as any).tFa : map.t}</Text>
        <Text style={[styles.simVerdictX, fa && styles.faBody]}>{fa && (map as any).fa ? (map as any).fa : map.x}</Text>
        <Pressable style={styles.simAgain} onPress={reset}>
          <Ionicons name="refresh" size={13} color={cu.textDim} />
          <Text style={styles.simAgainT}>{fa ? 'دوباره' : 'again'}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.simWrap, { transform: [{ translateX: sx }] }]}>
      <Text style={styles.simKicker}>{fa ? 'تعارف ' + (step + 1) + ' از ۳' : 'OFFER ' + (step + 1) + ' OF 3'}</Text>
      <View style={styles.simDots}>
        {[0, 1, 2].map((i) => <View key={i} style={[styles.simDot, i <= step && styles.simDotOn]} />)}
      </View>

      <Text style={styles.simFa}>{round.fa}</Text>
      <Text style={[styles.simHost, fa && styles.faBody]}>{fa && (round as any).hostFa ? (round as any).hostFa : round.host}</Text>

      <View style={styles.simBtns}>
        <Pressable style={[styles.simBtn, styles.simBtnGhost]} onPress={refuse}>
          <Text style={styles.simBtnGhostT}>{fa ? 'رد می‌کنم' : 'Refuse'}</Text>
        </Pressable>
        <Pressable style={[styles.simBtn, styles.simBtnSolid]} onPress={accept}>
          <Text style={styles.simBtnSolidT}>{fa ? 'قبول می‌کنم' : 'Accept'}</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

/* ---------- The del map ---------- */

const DEL_WORDS = [
  { fa: 'دلتنگ', tr: 'deltang', en: 'heart tight', x: 'Missing someone.', xFa: 'دلت برای کسی تنگ شده.' },
  { fa: 'دلسوز', tr: 'delsuz', en: 'heart burning', x: 'Compassionate. Your heart burns for them.', xFa: 'مهربان و دلواپس دیگری. دلت برایش می‌سوزد.' },
  { fa: 'دلبر', tr: 'delbar', en: 'heart carrier', x: 'The beloved. They took it with them.', xFa: 'معشوق. دل را با خودش برد.' },
  { fa: 'دلدار', tr: 'deldar', en: 'heart holder', x: 'The one who holds your heart.', xFa: 'آن که دلت دست اوست.' },
  { fa: 'دل‌شکسته', tr: 'delshekaste', en: 'heart broken', x: 'The same image in every language, but Persian got there first.', xFa: 'همین تصویر در هر زبانی هست، اما فارسی زودتر از همه به آن رسید.' },
  { fa: 'دلگیر', tr: 'delgir', en: 'heart caught', x: 'Melancholy. Something has your heart and will not let go.', xFa: 'گرفتگی و افسردگی. چیزی دلت را گرفته و رها نمی‌کند.' },
  { fa: 'دل‌خور', tr: 'delkhor', en: 'heart eaten', x: 'Hurt, quietly. Something is eating at it.', xFa: 'رنجیده، بی‌سروصدا. چیزی دارد دلت را می‌خورد.' },
  { fa: 'دلیر', tr: 'delir', en: 'heart strong', x: 'Brave. Courage is a property of the heart, not the nerve.', xFa: 'شجاع. جرئت خاصیتِ دل است، نه اعصاب.' },
];

export function DelMap() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [open, setOpen] = useState<number | null>(null);
  const pulse = useRef(new Animated.Value(0)).current;

  useState(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1300, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1300, useNativeDriver: true }),
      ])
    ).start();
  });

  const beat = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.07] });
  const sel = open !== null ? DEL_WORDS[open] : null;

  return (
    <View style={styles.dmWrap}>
      <Animated.View style={[styles.dmCore, { transform: [{ scale: beat }] }]}>
        <Text style={styles.dmCoreFa}>دل</Text>
        <Text style={styles.dmCoreEn}>del</Text>
      </Animated.View>

      <View style={styles.dmGrid}>
        {DEL_WORDS.map((w, i) => (
          <Pressable key={i} onPress={() => setOpen(open === i ? null : i)} style={[styles.dmChip, open === i && styles.dmChipOn]}>
            <Text style={[styles.dmChipFa, open === i && styles.dmChipFaOn]}>{w.fa}</Text>
            <Text style={styles.dmChipTr}>{w.tr}</Text>
          </Pressable>
        ))}
      </View>

      {sel ? (
        <View style={styles.dmCard}>
          <Text style={[styles.dmLit, fa && styles.faBody]}>{fa && (sel as any).enFa ? (sel as any).enFa : sel.en}</Text>
          <Text style={[styles.dmX, fa && styles.faBody]}>{fa && (sel as any).xFa ? (sel as any).xFa : sel.x}</Text>
        </View>
      ) : (
        <Text style={styles.dmHint}>touch a word</Text>
      )}
    </View>
  );
}

/* ---------- Typical Persian: flip cards ---------- */

const CARD_W = W - 72;

function FlipCard({ card }: { card: any }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [flipped, setFlipped] = useState(false);
  const f = useRef(new Animated.Value(0)).current;

  const flip = () => {
    const to = flipped ? 0 : 1;
    setFlipped(!flipped);
    Animated.timing(f, { toValue: to, duration: 480, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }).start();
  };

  const frontRot = f.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRot = f.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });
  const frontOp = f.interpolate({ inputRange: [0, 0.5, 0.51, 1], outputRange: [1, 1, 0, 0] });
  const backOp = f.interpolate({ inputRange: [0, 0.49, 0.5, 1], outputRange: [0, 0, 1, 1] });

  return (
    <Pressable onPress={flip} style={{ width: CARD_W }}>
      <View style={styles.flipStage}>
        <Animated.View style={[styles.flipFace, { opacity: frontOp, transform: [{ perspective: 1000 }, { rotateY: frontRot }] }]}>
          {card.isNew ? (
            <View style={styles.newTag}>
              <Ionicons name="sparkles" size={9} color={cu.bg} />
              <Text style={styles.newTagT}>{fa ? 'تازه، این هفته' : 'NEW THIS WEEK'}</Text>
            </View>
          ) : null}
          {card.fa ? <Text style={styles.flipFa}>{card.fa}</Text> : null}
          <Text style={[styles.flipFront, fa && styles.faFront]}>{fa && (card as any).frontFa ? (card as any).frontFa : card.front}</Text>
          <View style={styles.flipTurn}>
            <Ionicons name="sync-outline" size={12} color={cu.turquoise} />
            <Text style={styles.flipTurnT}>{fa ? 'حقیقتی که زیرش است' : 'the truth underneath'}</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.flipFace, styles.flipBack, { opacity: backOp, transform: [{ perspective: 1000 }, { rotateY: backRot }] }]}>
          <Text style={[styles.flipBackT, fa && styles.faBack]}>{fa && (card as any).backFa ? (card as any).backFa : card.back}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}

export function TypicalCards() {
  const [i, setI] = useState(0);
  const [deck] = useState(() => typicalDeck());
  const onEnd = (e: any) => setI(Math.round(e.nativeEvent.contentOffset.x / (CARD_W + spacing.md)));

  return (
    <View style={styles.tcWrap}>
      <ScrollView
        horizontal
        snapToInterval={CARD_W + spacing.md}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onEnd}
        contentContainerStyle={styles.tcRow}
      >
        {deck.map((c, n) => <FlipCard key={n} card={c} />)}
      </ScrollView>
      <View style={styles.tcFoot}>
        <Text style={styles.tcCount}>{i + 1} of {deck.length}</Text>
        <Text style={styles.tcShuffle}>shuffled  ·  new one every week</Text>
      </View>
    </View>
  );
}

/* ---------- The zurkhaneh ---------- */

export function Zurkhaneh() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [on, setOn] = useState(false);
  const swing = useRef(new Animated.Value(0)).current;
  const drum = useRef(new Animated.Value(0)).current;
  const loops = useRef<any>(null);

  const toggle = () => {
    if (on) {
      loops.current?.stop();
      setOn(false);
      return;
    }
    setOn(true);
    loops.current = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(swing, { toValue: 1, duration: 620, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(swing, { toValue: 0, duration: 620, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
        Animated.sequence([
          Animated.timing(drum, { toValue: 1, duration: 130, useNativeDriver: true }),
          Animated.timing(drum, { toValue: 0, duration: 490, useNativeDriver: true }),
          Animated.delay(620),
        ]),
      ])
    );
    loops.current.start();
  };

  const rotL = swing.interpolate({ inputRange: [0, 1], outputRange: ['-58deg', '32deg'] });
  const rotR = swing.interpolate({ inputRange: [0, 1], outputRange: ['58deg', '-32deg'] });
  const hit = drum.interpolate({ inputRange: [0, 1], outputRange: [1, 1.16] });

  return (
    <Pressable style={styles.zWrap} onPress={toggle}>
      <Text style={styles.zKicker}>{fa ? 'زورخانه' : 'THE ZURKHANEH'}</Text>

      <View style={styles.zRoom}>
        <View style={styles.zDome} />
        <Animated.View style={[styles.zMorshed, { transform: [{ scale: hit }] }]}>
          <View style={styles.zDrum} />
        </Animated.View>

        <View style={styles.zPit}>
          <View style={styles.zAthlete}>
            <View style={styles.zHead} />
            <View style={styles.zTorso} />
            <Animated.View style={[styles.zClub, styles.zClubL, { transform: [{ rotate: rotL }] }]} />
            <Animated.View style={[styles.zClub, styles.zClubR, { transform: [{ rotate: rotR }] }]} />
          </View>
        </View>
      </View>

      <Text style={styles.zHint}>{on ? 'and the morshed is chanting Ferdowsi' : 'touch to start the drum'}</Text>
      {on ? <Text style={styles.zVerse}>He who is strong and does not use it on the weak, that one is a man.</Text> : null}
    </Pressable>
  );
}

/* ---------- The rice pot ---------- */

export function RicePot() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [lifted, setLifted] = useState(false);
  const a = useRef(new Animated.Value(0)).current;

  const lift = () => {
    if (lifted) return;
    setLifted(true);
    Animated.timing(a, { toValue: 1, duration: 1100, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  };

  const flipY = a.interpolate({ inputRange: [0, 1], outputRange: [0, -8] });
  const crust = a.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const lidY = a.interpolate({ inputRange: [0, 1], outputRange: [0, -54] });
  const lidO = a.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });

  return (
    <Pressable style={styles.rWrap} onPress={lift}>
      <Text style={styles.rKicker}>{fa ? 'ته دیگ' : 'TAHDIG'}</Text>

      <View style={styles.rStage}>
        <Animated.View style={[styles.rLid, { transform: [{ translateY: lidY }], opacity: lidO }]} />
        <Animated.View style={{ transform: [{ translateY: flipY }] }}>
          <View style={styles.rPot}>
            <View style={styles.rRice} />
            <Animated.View style={[styles.rCrust, { opacity: crust }]} />
          </View>
        </Animated.View>
      </View>

      <Text style={styles.rHint}>{lifted ? 'the bottom of the pot' : 'touch to lift the lid'}</Text>
      {lifted ? <Text style={styles.rNote}>Golden, crisp, and there is never enough. The guest is offered it first. That part is not optional.</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  faFront: { fontFamily: fonts.persian, fontSize: 17, lineHeight: 34, textAlign: 'center', writingDirection: 'rtl' },
  faBack: { fontFamily: fonts.persian, fontSize: 14, lineHeight: 30, textAlign: 'right', writingDirection: 'rtl' },
  simWrap: { marginVertical: spacing.xl, padding: spacing.xl, backgroundColor: cu.surface, borderRadius: 14, borderWidth: 1, borderColor: cu.hair, alignItems: 'center' },
  simKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: cu.saffron },
  simDots: { flexDirection: 'row', gap: 6, marginTop: spacing.sm },
  simDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: cu.hair },
  simDotOn: { backgroundColor: cu.saffron },
  simFa: { fontFamily: fonts.persian, fontSize: 22, color: cu.saffron, marginTop: spacing.lg },
  simHost: { fontFamily: fonts.heading, fontSize: fontSize.lg, lineHeight: 28, color: cu.text, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },
  simBtns: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  simBtn: { paddingVertical: spacing.sm, paddingHorizontal: spacing.xl, borderRadius: 30 },
  simBtnGhost: { borderWidth: 1, borderColor: cu.hair },
  simBtnGhostT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: cu.text },
  simBtnSolid: { backgroundColor: cu.saffron },
  simBtnSolidT: { fontFamily: fonts.bodyStrong, fontSize: 12, color: cu.bg },
  simVerdict: { fontFamily: fonts.heading, fontSize: 26 },
  simVerdictX: { fontFamily: fonts.body, fontSize: 13, lineHeight: 22, color: cu.text, textAlign: 'center', marginTop: spacing.md, opacity: 0.9 },
  simAgain: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.lg },
  simAgainT: { fontFamily: fonts.bodyStrong, fontSize: 11, color: cu.textDim },

  dmWrap: { marginVertical: spacing.xl, alignItems: 'center' },
  dmCore: { width: 78, height: 78, borderRadius: 40, borderWidth: 1, borderColor: cu.pomegranate, alignItems: 'center', justifyContent: 'center', backgroundColor: cu.surface },
  dmCoreFa: { fontFamily: fonts.persian, fontSize: 27, color: cu.pomegranate },
  dmCoreEn: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 2, color: cu.textDim, marginTop: 1 },
  dmGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: spacing.sm, marginTop: spacing.lg },
  dmChip: { borderWidth: 1, borderColor: cu.hair, borderRadius: 9, paddingHorizontal: spacing.md, paddingVertical: 6, alignItems: 'center', backgroundColor: cu.surface },
  dmChipOn: { borderColor: cu.pomegranate },
  dmChipFa: { fontFamily: fonts.persian, fontSize: 14, color: cu.text },
  dmChipFaOn: { color: cu.pomegranate },
  dmChipTr: { fontFamily: fonts.body, fontSize: 9, color: cu.textDim },
  dmCard: { marginTop: spacing.lg, alignItems: 'center', paddingHorizontal: spacing.lg },
  dmLit: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: cu.pomegranate },
  dmX: { fontFamily: fonts.body, fontSize: 13, lineHeight: 21, color: cu.text, textAlign: 'center', marginTop: spacing.xs },
  dmHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: cu.textDim, marginTop: spacing.lg },

  tcWrap: { marginVertical: spacing.lg, marginHorizontal: -spacing.lg },
  tcRow: { paddingHorizontal: spacing.lg, gap: spacing.md },
  tcFoot: { alignItems: 'center', marginTop: spacing.lg, gap: 3 },
  tcCount: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: cu.textDim, textAlign: 'center' },
  tcShuffle: { fontFamily: fonts.body, fontSize: 9, color: cu.textDim, opacity: 0.7, fontStyle: 'italic' },
  newTag: { position: 'absolute', top: spacing.md, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: cu.turquoise, borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  newTagT: { fontFamily: fonts.bodyStrong, fontSize: 7.5, letterSpacing: 1.2, color: cu.bg },
  flipStage: { height: 230 },
  flipFace: { ...StyleSheet.absoluteFillObject, backgroundColor: cu.surface, borderRadius: 14, borderWidth: 1, borderColor: cu.hair, padding: spacing.xl, alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden' },
  flipBack: { backgroundColor: cu.raised, borderColor: cu.turquoise },
  flipFa: { fontFamily: fonts.persian, fontSize: 19, color: cu.turquoise, marginBottom: spacing.md },
  flipFront: { fontFamily: fonts.heading, fontSize: 21, lineHeight: 30, color: cu.text, textAlign: 'center' },
  flipTurn: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.xl },
  flipTurnT: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.5, color: cu.turquoise },
  flipBackT: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 23, color: cu.text, textAlign: 'center' },

  zWrap: { marginVertical: spacing.xl, padding: spacing.lg, backgroundColor: cu.surface, borderRadius: 14, borderWidth: 1, borderColor: cu.hair, alignItems: 'center' },
  zKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: cu.pistachio },
  zRoom: { width: '100%', height: 130, alignItems: 'center', justifyContent: 'flex-end', marginTop: spacing.md },
  zDome: { position: 'absolute', top: 0, width: 150, height: 44, borderTopLeftRadius: 80, borderTopRightRadius: 80, borderWidth: 1, borderBottomWidth: 0, borderColor: cu.hair },
  zMorshed: { position: 'absolute', right: 16, top: 40 },
  zDrum: { width: 20, height: 24, borderRadius: 4, backgroundColor: cu.pistachio, opacity: 0.85 },
  zPit: { width: 118, height: 62, borderWidth: 1, borderColor: cu.pistachio, borderTopWidth: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: cu.bg },
  zAthlete: { alignItems: 'center' },
  zHead: { width: 8, height: 8, borderRadius: 4, backgroundColor: cu.text },
  zTorso: { width: 3, height: 18, backgroundColor: cu.text, marginTop: 1 },
  zClub: { position: 'absolute', top: 8, width: 3, height: 22, borderRadius: 2, backgroundColor: cu.gold },
  zClubL: { left: -8 },
  zClubR: { right: -8 },
  zHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: cu.textDim, marginTop: spacing.md },
  zVerse: { fontFamily: fonts.heading, fontSize: fontSize.base, lineHeight: 24, color: cu.pistachio, textAlign: 'center', marginTop: spacing.sm, fontStyle: 'italic' },

  rWrap: { marginVertical: spacing.xl, padding: spacing.lg, backgroundColor: cu.surface, borderRadius: 14, borderWidth: 1, borderColor: cu.hair, alignItems: 'center' },
  rKicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: cu.turquoise },
  rStage: { height: 110, justifyContent: 'flex-end', alignItems: 'center', marginTop: spacing.md },
  rLid: { position: 'absolute', top: 8, width: 92, height: 8, borderRadius: 5, backgroundColor: cu.hair },
  rPot: { width: 84, height: 62, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 1, borderColor: cu.hair, overflow: 'hidden', justifyContent: 'flex-end' },
  rRice: { height: 44, backgroundColor: '#EFE7D6' },
  rCrust: { height: 15, backgroundColor: '#C98A3C' },
  rHint: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: cu.textDim, marginTop: spacing.md },
  rNote: { fontFamily: fonts.body, fontSize: 12, lineHeight: 20, color: cu.text, textAlign: 'center', marginTop: spacing.sm, opacity: 0.9 },
});

/* ---------- The dishes ---------- */
import { Image, Modal } from 'react-native';
import { DISHES, SWEETS } from '@/constants/culture';
import { eduImage } from '@/constants/education-images';
import { useLang, getLang } from '@/lib/i18n';

export function Sweets() { return <DishList list={SWEETS} />; }
export function Dishes() { return <DishList list={DISHES} />; }

function DishList({ list }: { list: any[] }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const DISHES = list;
  const [open, setOpen] = useState<number | null>(null);
  const d = open !== null ? DISHES[open] : null;
  const src = d ? eduImage(d.image) : null;

  return (
    <View style={dstyles.wrap}>
      {DISHES.map((dish, i) => (
        <Pressable key={dish.key} style={dstyles.row} onPress={() => setOpen(i)}>
          <View style={dstyles.rowText}>
            <Text style={[dstyles.name, fa && (dish as any).fa && { fontFamily: fonts.persian }]}>{fa && (dish as any).fa ? (dish as any).fa : dish.name}</Text>
            <Text style={dstyles.tag}>{fa && (dish as any).tagFa ? (dish as any).tagFa : dish.tag}</Text>
          </View>
          {/* The counterpart, not always Persian — in the Persian build
              the name above is already Persian. */}
          <Text style={dstyles.fa}>{fa ? dish.name : dish.fa}</Text>
          <Ionicons name="image-outline" size={14} color={cu.turquoise} />
        </Pressable>
      ))}

      <Modal transparent visible={open !== null} animationType="fade" onRequestClose={() => setOpen(null)}>
        <Pressable style={dstyles.backdrop} onPress={() => setOpen(null)}>
          <Pressable style={dstyles.card} onPress={() => {}}>
            {src ? (
              <Image source={src} style={dstyles.img} resizeMode="cover" />
            ) : (
              <View style={[dstyles.img, dstyles.imgPh]}>
                <Ionicons name="restaurant-outline" size={26} color={cu.textDim} />
              </View>
            )}
            <View style={dstyles.cardBody}>
              <Text style={dstyles.cardFa}>{fa ? d?.name : d?.fa}</Text>
              <Text style={[dstyles.cardName, fa && (d as any)?.fa && { fontFamily: fonts.persian }]}>{fa && (d as any)?.fa ? (d as any).fa : d?.name}</Text>
              <View style={dstyles.cardRule} />
              <Text style={[dstyles.cardX, fa && (d as any)?.xFa && dstyles.faBody]}>{fa && (d as any)?.xFa ? (d as any).xFa : d?.x}</Text>
            </View>
            <Pressable style={dstyles.close} hitSlop={10} onPress={() => setOpen(null)}>
              <Ionicons name="close" size={19} color={cu.text} />
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const dstyles = StyleSheet.create({
  faBody: { fontFamily: fonts.persian, fontSize: 14, lineHeight: 30, textAlign: 'right', writingDirection: 'rtl' },
  wrap: { marginVertical: spacing.lg, gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, backgroundColor: cu.surface, borderRadius: 11, borderWidth: 1, borderColor: cu.hair, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  rowText: { flex: 1 },
  name: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: cu.text },
  tag: { fontFamily: fonts.bodyStrong, fontSize: 7.5, letterSpacing: 1.5, color: cu.turquoise, marginTop: 2 },
  fa: { fontFamily: fonts.persian, fontSize: 14, color: cu.textDim },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '100%', maxWidth: 350, backgroundColor: cu.surface, borderRadius: 14, borderWidth: 1, borderColor: cu.hair, overflow: 'hidden' },
  img: { width: '100%', height: 190, backgroundColor: cu.raised },
  imgPh: { alignItems: 'center', justifyContent: 'center' },
  cardBody: { padding: spacing.lg },
  cardFa: { fontFamily: fonts.persian, fontSize: 17, color: cu.turquoise },
  cardName: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: cu.text, marginTop: 2 },
  cardRule: { width: 24, height: 1, backgroundColor: cu.turquoise, marginVertical: spacing.md },
  cardX: { fontFamily: fonts.body, fontSize: 13, lineHeight: 22, color: cu.text, opacity: 0.9 },
  close: { position: 'absolute', top: spacing.md, right: spacing.md, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' },
});
