import { useEffect, useState } from 'react';
import { Linking, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { tpm } from '@/constants/tpm-theme';
import { tpmPost, TPM_POSTS } from '@/constants/tpm-content';
import { FramedImage } from '@/components/framed-image';
import { eduImage } from '@/constants/education-images';
import { TpmMark } from '@/components/tpm-mark';
import { canRead, markRead, useTpmAccess } from '@/lib/tpm-access';
import { Paywall } from '@/components/tpm-paywall';

import { useLang } from '@/lib/i18n';
const W = Dimensions.get('window').width;

/**
 * Render *emphasis* and **strong** inside a line.
 *
 * A sentence that lifts once in a page is worth having; a block-level
 * emphasis would break the line to do it, which is the opposite of the
 * effect. Marked in the copy, so whoever writes the piece decides where
 * it falls rather than the renderer.
 */
function inline(x: string, base: any, em: any, strong: any) {
  const parts = x.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  if (parts.length === 1) return x;
  return parts.map((piece, i) => {
    if (piece.startsWith('**') && piece.endsWith('**')) {
      return <Text key={i} style={strong}>{piece.slice(2, -2)}</Text>;
    }
    if (piece.startsWith('*') && piece.endsWith('*')) {
      return <Text key={i} style={em}>{piece.slice(1, -1)}</Text>;
    }
    return piece;
  });
}

export default function TpmPostScreen() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const { post } = useLocalSearchParams<{ post?: string }>();
  const p = tpmPost(post);
  useTpmAccess();

  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!p) return;
    if (canRead(p.key)) markRead(p.key);
    else setLocked(true);
  }, [p?.key]);

  if (!p) {
    return (
      <SafeAreaView style={s.safe} edges={['top']}>
        <View style={s.mid}><Text style={s.muted}>Not found.</Text></View>
      </SafeAreaView>
    );
  }

  const more = TPM_POSTS.filter((x) => x.key !== p.key).slice(0, 3);

  return (
    <View style={{ flex: 1, backgroundColor: tpm.paper }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <View style={s.nav}>
          <Pressable hitSlop={12} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
            <Ionicons name="chevron-back" size={23} color={tpm.ink} />
          </Pressable>
          <TpmMark size={24} />
          <View style={{ width: 23 }} />
        </View>
        <View style={s.rule} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
          <View style={s.cover}>
            <FramedImage name={p.cover} source={eduImage(p.cover)} style={StyleSheet.absoluteFill as any} />
          </View>

          <View style={s.body}>
            <Text style={s.kicker}>{p.discipline.toUpperCase()}</Text>
            <Text style={s.title}>{p.title}</Text>
            <Text style={s.stand}>{p.standfirst}</Text>

            <View style={s.meta}>
              <Text style={s.metaT}>THE PERSIAN MAG</Text>
              <View style={s.metaDot} />
              <Text style={s.metaT}>{p.minutes} MIN</Text>
            </View>
          </View>

          {/* the piece itself, faded out and cut short when locked */}
          <View style={locked ? s.lockedWrap : undefined}>
            <View style={s.body}>
              {/* Nine kinds. The variety in these pages comes from how each
                  piece is marked up rather than from a rule alternating
                  shapes, which is how a magazine actually works — someone
                  laid every page out. */}
              {(locked ? p.body.slice(0, 1) : p.body).map((b: any, i: number) => {
                // A second kind of opening: a drop capital, no rule, body
                // size. Every piece starting with the same bold statement
                // made them look like one template with different words in
                // it, which is exactly what a magazine is not.
                if (b.t === 'open') return (
                  <Text key={i} style={s.openP}>
                    <Text style={s.dropCap}>{b.x.slice(0, 1)}</Text>
                    {inline(b.x.slice(1), s.openP, s.em, s.strong)}
                  </Text>
                );

                if (b.t === 'lead') return (
                  <View key={i} style={s.leadWrap}>
                    <Text style={s.lead}>{inline(b.x, s.lead, s.em, s.strong)}</Text>
                    <View style={s.leadRule} />
                  </View>
                );

                if (b.t === 'term') return (
                  <View key={i} style={s.term}>
                    <View style={s.termHead}>
                      <Text style={s.termT}>{b.x}</Text>
                      {b.fa ? <Text style={s.termFa}>{b.fa}</Text> : null}
                    </View>
                    <Text style={s.termDef}>{inline(b.def, s.termDef, s.em, s.strong)}</Text>
                  </View>
                );

                if (b.t === 'term') return (
                  <View key={i} style={s.term}>
                    <View style={s.termHead}>
                      <Text style={s.termT}>{b.x}</Text>
                      {b.fa ? <Text style={s.termFa}>{b.fa}</Text> : null}
                    </View>
                    <Text style={s.termDef}>{inline(b.def, s.termDef, s.em, s.strong)}</Text>
                  </View>
                );

                if (b.t === 'qa') return (
                  <View key={i} style={s.qa}>
                    {b.q ? <Text style={s.qaQ}>{b.q}</Text> : null}
                    {/* Who is answering, where more than one person is in
                        the room. Omitted for a single-subject interview,
                        where repeating the name every time is noise. */}
                    {b.who ? <Text style={s.qaWho}>{b.who}</Text> : null}
                    <Text style={s.qaA}>{inline(b.x, s.qaA, s.em, s.strong)}</Text>
                  </View>
                );
                if (b.t === 'h') return <Text key={i} style={s.h}>{b.x}</Text>;

                if (b.t === 'line') return (
                  <Text key={i} style={s.line}>{b.x}</Text>
                );

                if (b.t === 'note') return (
                  <View key={i} style={s.note}>
                    <Text style={s.noteT}>{b.x}</Text>
                  </View>
                );

                if (b.t === 'divider') return (
                  <View key={i} style={s.dividerWrap}>
                    <TpmMark size={13} />
                  </View>
                );

                if (b.t === 'img') return (
                  <View key={i} style={s.blockImgWrap}>
                    <View style={s.blockImg}>
                      <FramedImage name={b.key} source={eduImage(b.key)} style={StyleSheet.absoluteFill as any} />
                    </View>
                    {b.cap ? <Text style={s.cap}>{b.cap}</Text> : null}
                  </View>
                );

                if (b.t === 'duo') return (
                  <View key={i} style={s.blockImgWrap}>
                    <View style={s.duo}>
                      {b.keys.map((k: string) => (
                        <View key={k} style={s.duoImg}>
                          <FramedImage name={k} source={eduImage(k)} style={StyleSheet.absoluteFill as any} />
                        </View>
                      ))}
                    </View>
                    {b.cap ? <Text style={s.cap}>{b.cap}</Text> : null}
                  </View>
                );

                if (b.t === 'q') return (
                  <View key={i} style={s.quote}>
                    <View style={s.quoteBar} />
                    <View style={{ flex: 1 }}>
                      <Text style={s.quoteT}>{b.x}</Text>
                      {b.who ? <Text style={s.quoteWho}>{b.who}</Text> : null}
                    </View>
                  </View>
                );

                return <Text key={i} style={s.p}>{inline(b.x, s.p, s.em, s.strong)}</Text>;
              })}
            </View>

            {!locked && p.images?.length ? (
              <View style={s.gallery}>
                {p.images.map((k) => (
                  <View key={k} style={s.galleryImg}>
                    <FramedImage name={k} source={eduImage(k)} style={StyleSheet.absoluteFill as any} />
                  </View>
                ))}
              </View>
            ) : null}

            {locked ? <View style={s.fade} pointerEvents="none" /> : null}
          </View>

          {locked ? (
            <Paywall onDone={() => setLocked(false)} />
          ) : (
            <>
              <View style={s.endRule} />

              {/* Their words. The line says so and goes to them — a
                  partnership should be legible from inside the piece, not
                  only from the tab it sits in. */}
              <Pressable onPress={() => Linking.openURL('https://thepersianmag.net')}>
                <Text style={s.credit}>Excerpt from The Persian Mag</Text>
              </Pressable>
              <Text style={s.endMark}>THE PERSIAN MAG</Text>

              <View style={s.moreHead}>
                <Text style={s.moreL}>MORE FROM TPM</Text>
              </View>
              {more.map((m) => (
                <Pressable key={m.key} style={s.moreRow} onPress={() => router.replace(('/tpm/post?post=' + m.key) as any)}>
                  <View style={s.moreImg}>
                    <FramedImage name={m.cover} source={eduImage(m.cover)} style={StyleSheet.absoluteFill as any} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.moreKicker}>{m.discipline.toUpperCase()}</Text>
                    <Text style={s.moreT} numberOfLines={2}>{m.title}</Text>
                  </View>
                </Pressable>
              ))}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: tpm.paper },
  mid: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { fontFamily: fonts.body, fontSize: 14, color: tpm.muted },

  nav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  rule: { height: 2, backgroundColor: tpm.ink },

  cover: { width: W, height: W * 1.2, backgroundColor: tpm.paperAlt },
  body: { paddingHorizontal: spacing.lg },

  kicker: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2, color: tpm.red, marginTop: spacing.lg },
  title: { fontFamily: fonts.bodyStrong, fontSize: 30, lineHeight: 35, letterSpacing: -0.6, color: tpm.ink, marginTop: 8 },
  stand: { fontFamily: fonts.body, fontSize: 15, lineHeight: 24, color: tpm.inkSoft, marginTop: spacing.md },

  meta: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.lg, paddingBottom: spacing.lg, borderBottomWidth: 1, borderBottomColor: tpm.hair },
  metaT: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 1.8, color: tpm.muted },
  metaDot: { width: 3, height: 3, backgroundColor: tpm.faint },

  p: { fontFamily: fonts.body, fontSize: 16, lineHeight: 28, color: tpm.ink, marginTop: spacing.lg },
  h: { fontFamily: fonts.bodyStrong, fontSize: 19, color: tpm.ink, marginTop: spacing.xl },
  quote: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  quoteBar: { width: 3, backgroundColor: tpm.red },
  quoteT: { fontFamily: fonts.bodyStrong, fontSize: 19, lineHeight: 27, color: tpm.ink },
  quoteWho: { fontFamily: fonts.body, fontSize: 11.5, color: tpm.muted, marginTop: 6 },

  gallery: { marginTop: spacing.xxl, gap: 2 },
  galleryImg: { width: W, aspectRatio: 1, backgroundColor: tpm.paperAlt },

  lockedWrap: { position: 'relative', maxHeight: 260, overflow: 'hidden' },
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 120, backgroundColor: tpm.paper, opacity: 0.92 },

  endRule: { height: 1, backgroundColor: tpm.hair, marginHorizontal: spacing.lg, marginTop: spacing.xxl },
  endMark: { fontFamily: fonts.bodyStrong, fontSize: 8.5, letterSpacing: 2.5, color: tpm.faint, textAlign: 'center', marginTop: spacing.lg },

  moreHead: { paddingHorizontal: spacing.lg, marginTop: spacing.xxl, marginBottom: spacing.md },
  moreL: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 2.4, color: tpm.ink },
  moreRow: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderTopWidth: 1, borderTopColor: tpm.hair },
  moreImg: { width: 84, height: 84, backgroundColor: tpm.paperAlt },
  moreKicker: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.6, color: tpm.red },
  moreT: { fontFamily: fonts.bodyStrong, fontSize: 15, lineHeight: 19, color: tpm.ink, marginTop: 4 },
  // A statement, not oversized body copy. It was sitting between the two
  // and reading as neither.
  leadWrap: { marginBottom: spacing.xl },
  lead: {
    fontFamily: fonts.bodyStrong, fontSize: 21, lineHeight: 29,
    letterSpacing: -0.3, color: tpm.ink,
  },
  leadRule: {
    height: 2, width: 40, backgroundColor: tpm.red,
    marginTop: spacing.lg,
  },

  openP: {
    fontFamily: fonts.body, fontSize: 15, lineHeight: 25,
    color: tpm.ink, marginBottom: spacing.lg,
  },
  dropCap: {
    fontFamily: fonts.bodyStrong, fontSize: 34, lineHeight: 34,
    color: tpm.red,
  },

  em: { fontStyle: 'italic' },
  strong: { fontFamily: fonts.bodyStrong },

  // Interviews. The question carries the red so the eye can find the next
  // one without reading for it.
  qa: { marginBottom: spacing.lg },
  qaQ: {
    fontFamily: fonts.bodyStrong, fontSize: 14.5, lineHeight: 21,
    color: tpm.red, marginBottom: spacing.sm,
  },
  qaA: { fontFamily: fonts.body, fontSize: 15, lineHeight: 25, color: tpm.ink },
  qaWho: {
    fontFamily: fonts.bodyStrong, fontSize: 9.5, letterSpacing: 1.6,
    color: tpm.muted, marginBottom: 5,
  },

  // A glossary. The word and its Persian on one line, the definition
  // under it — so the eye can run down the page looking for one entry
  // rather than reading every line to find it.
  term: { marginBottom: spacing.lg },
  termHead: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, flexWrap: 'wrap' },
  termT: { fontFamily: fonts.bodyStrong, fontSize: 16, color: tpm.ink },
  termFa: { fontFamily: fonts.persian, fontSize: 15, color: tpm.red },
  termDef: {
    fontFamily: fonts.body, fontSize: 14, lineHeight: 22,
    color: tpm.inkSoft, marginTop: 5,
  },

  // A glossary. The word and its Persian on one line, the definition
  // under it — so the eye can run down the page looking for one entry
  // rather than reading every line to find it.
  term: { marginBottom: spacing.lg },
  termHead: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, flexWrap: 'wrap' },
  termT: { fontFamily: fonts.bodyStrong, fontSize: 16, color: tpm.ink },
  termFa: { fontFamily: fonts.persian, fontSize: 15, color: tpm.red },
  termDef: {
    fontFamily: fonts.body, fontSize: 14, lineHeight: 22,
    color: tpm.inkSoft, marginTop: 5,
  },

  credit: {
    fontFamily: fonts.body, fontSize: 10.5, color: tpm.faint,
    textAlign: 'center', marginTop: spacing.xl, marginBottom: spacing.xxl,
  },
  line: {
    fontFamily: fonts.bodyStrong, fontSize: 20, lineHeight: 27,
    color: tpm.ink, marginVertical: spacing.xl, textAlign: 'center',
  },
  note: {
    backgroundColor: tpm.paperAlt, padding: spacing.md,
    marginVertical: spacing.lg,
  },
  noteT: { fontFamily: fonts.body, fontSize: 13, lineHeight: 20, color: tpm.inkSoft },
  dividerWrap: { alignItems: 'center', marginVertical: spacing.xl },
  blockImgWrap: { marginVertical: spacing.lg },
  blockImg: { width: '100%', aspectRatio: 1.2, backgroundColor: tpm.paperAlt },
  duo: { flexDirection: 'row', gap: 2 },
  duoImg: { flex: 1, aspectRatio: 0.8, backgroundColor: tpm.paperAlt },
  cap: {
    fontFamily: fonts.body, fontSize: 11, color: tpm.muted,
    marginTop: 7,
  },
});
