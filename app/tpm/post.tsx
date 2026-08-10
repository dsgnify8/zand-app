import { useEffect, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

const W = Dimensions.get('window').width;

export default function TpmPostScreen() {
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
              {(locked ? p.body.slice(0, 1) : p.body).map((b, i) => {
                if (b.t === 'h') return <Text key={i} style={s.h}>{b.x}</Text>;
                if (b.t === 'q') return (
                  <View key={i} style={s.quote}>
                    <View style={s.quoteBar} />
                    <View style={{ flex: 1 }}>
                      <Text style={s.quoteT}>{b.x}</Text>
                      {b.who ? <Text style={s.quoteWho}>{b.who}</Text> : null}
                    </View>
                  </View>
                );
                return <Text key={i} style={s.p}>{b.x}</Text>;
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
});
