import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { lit, LITERATURE_FIGURES, AUTHORS } from '@/constants/literature';
import { eduImage } from '@/constants/education-images';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

function coverFor(authorKey?: string) {
  if (!authorKey) return null;
  const a = AUTHORS.find((x) => x.key === authorKey);
  return a?.cover ? eduImage(a.cover) : null;
}

export default function LiteratureHub() {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.back} onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
          <Ionicons name="chevron-back" size={20} color={lit.textDim} />
          <Text style={styles.backText}>{t(APP.explore)}</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>{t(APP.literature)}</Text>
          <Text style={styles.glyph}>ادبیات</Text>
        </View>
        <Text style={styles.subtitle}>The poets and writers whose words became the soul of Iran, across a thousand years.</Text>

        <View style={styles.list}>
          {LITERATURE_FIGURES.map((f) => {
            const ready = f.status === 'ready' && 'authorKey' in f;
            const src = coverFor((f as any).authorKey);
            const tag = (f as any).tag;

            return (
              <Pressable
                key={f.name}
                style={[styles.card, !ready && styles.cardSoon]}
                disabled={!ready}
                onPress={() => ready && router.navigate('/literature/reader?author=' + (f as any).authorKey + '&page=0' as any)}
              >
                {src ? (
                  <Image source={src} style={styles.cover} resizeMode="cover" />
                ) : (
                  <View style={[styles.cover, styles.coverPh]} />
                )}

                <LinearGradient
                  colors={['rgba(24,18,12,0.42)', 'rgba(24,18,12,0.72)', 'rgba(24,18,12,0.92)']}
                  locations={[0, 0.5, 1]}
                  style={StyleSheet.absoluteFill as any}
                  pointerEvents="none"
                />

                <View style={styles.body}>
                  <Text style={styles.fa}>{f.persian}</Text>
                  <Text style={styles.name}>{f.name}</Text>
                  <View style={styles.rule} />
                  <Text style={styles.epithet}>{f.epithet}</Text>
                  <Text style={styles.years}>{f.years}</Text>

                  {tag ? (
                    <View style={styles.tag}>
                      <Ionicons name="sparkles" size={9} color={lit.gold} />
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ) : null}

                  {ready ? (
                    <View style={styles.open}>
                      <Text style={styles.openText}>READ</Text>
                      <Ionicons name="arrow-forward" size={13} color="#F3ECDF" />
                    </View>
                  ) : (
                    <Text style={styles.soon}>{t(APP.soon)}</Text>
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_H = 210;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: lit.bg },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  back: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm },
  backText: { fontFamily: fonts.body, fontSize: fontSize.base, color: lit.textDim },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: fontSize.display, color: lit.text },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.xxl, color: lit.gold },
  subtitle: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: lit.textDim, marginTop: spacing.sm },

  list: { marginTop: spacing.xl, gap: spacing.md },

  card: { height: CARD_H, borderRadius: radius.lg, overflow: 'hidden', backgroundColor: lit.surface, alignItems: 'center', justifyContent: 'center' },
  cardSoon: { opacity: 0.55 },
  cover: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  coverPh: { backgroundColor: lit.ink, opacity: 0.35 },

  fa: { fontFamily: fonts.persian, fontSize: 15, color: lit.gold, opacity: 0.9, transform: [{ rotate: '90deg' }], width: 150, textAlign: 'center' },

  body: { alignItems: 'center', paddingHorizontal: spacing.xxl },
  name: { fontFamily: fonts.heading, fontSize: 27, color: '#F7F2E8', textAlign: 'center' },
  rule: { width: 30, height: 1, backgroundColor: lit.gold, marginVertical: spacing.sm, opacity: 0.85 },
  epithet: { fontFamily: fonts.body, fontSize: 13, color: '#E8C9C4', textAlign: 'center', fontStyle: 'italic' },
  years: { fontFamily: fonts.body, fontSize: 11, color: 'rgba(243,236,223,0.65)', textAlign: 'center', marginTop: 3 },

  tag: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: spacing.md, borderWidth: 1, borderColor: lit.gold, borderRadius: radius.sm, paddingHorizontal: 7, paddingVertical: 2 },
  tagText: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1, color: lit.gold },

  open: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: spacing.md },
  openText: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 2, color: '#F3ECDF' },
  soon: { fontFamily: fonts.bodyStrong, fontSize: 9, letterSpacing: 1.5, color: 'rgba(243,236,223,0.7)', marginTop: spacing.md, borderWidth: 1, borderColor: 'rgba(243,236,223,0.3)', borderRadius: radius.sm, paddingHorizontal: 7, paddingVertical: 2, overflow: 'hidden' },
});
