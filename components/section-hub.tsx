import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export type HubItem = {
  key: string;
  title: string;
  persian?: string;
  description: string;
  status?: 'ready' | 'soon';
  route?: string;
};

type Props = {
  glyph: string;
  title: string;
  subtitle: string;
  items: HubItem[];
  showBack?: boolean;
  backLabel?: string;
};

export function SectionHub({ glyph, title, subtitle, items, showBack, backLabel = 'Back' }: Props) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader showSearch={!showBack} />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {showBack ? (
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
            <Text style={styles.backBtnText}>{backLabel}</Text>
          </Pressable>
        ) : null}

        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.glyph}>{glyph}</Text>
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.list}>
          {items.map((m) => {
            const disabled = m.status === 'soon' || !m.route;
            return (
              <Pressable key={m.key} style={styles.card} disabled={disabled} onPress={() => m.route && router.navigate(m.route as any)}>
                <View style={styles.cardText}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{m.title}</Text>
                    {m.status === 'soon' && <Text style={styles.soon}>{t(APP.soon)}</Text>}
                  </View>
                  <Text style={styles.cardDescription}>{m.description}</Text>
                </View>
                {m.persian ? <Text style={styles.cardGlyph}>{m.persian}</Text> : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  container: { padding: spacing.lg, paddingBottom: spacing.xxl },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.sm },
  backBtnText: { fontFamily: fonts.body, fontSize: fontSize.base, color: colors.textSecondary },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, marginTop: spacing.md },
  title: { fontFamily: fonts.heading, fontSize: fontSize.xxl, color: colors.textPrimary, flexShrink: 1 },
  glyph: { fontFamily: fonts.persian, fontSize: fontSize.display, color: colors.accent },
  subtitle: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: colors.textSecondary, marginTop: spacing.sm },
  list: { marginTop: spacing.xl, gap: spacing.md },
  card: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  cardText: { flex: 1, paddingRight: spacing.md },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  cardTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: colors.textPrimary },
  soon: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1, color: colors.textSecondary, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: 6, paddingVertical: 2, overflow: 'hidden' },
  cardDescription: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 20, color: colors.textSecondary, marginTop: spacing.xs },
  cardGlyph: { fontFamily: fonts.persian, fontSize: fontSize.xl, color: colors.accent },
});
