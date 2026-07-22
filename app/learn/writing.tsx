import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { ZandHeader } from '@/components/zand-header';
import { PERSIAN_ALPHABET, positionalForms } from '@/constants/persian-alphabet';
import { WRITING } from '@/constants/writing';

const FORM_LABELS = ['FINAL · DETACHED', 'FINAL · ATTACHED', 'MEDIAL', 'INITIAL'];

export default function WritingScreen() {
  const [i, setI] = useState(0);
  const letter = PERSIAN_ALPHABET[i];
  const w = WRITING[letter.char];
  const forms = positionalForms(letter.char);
  const formValues = [forms.isolated, forms.final, forms.medial, forms.initial];
  const total = PERSIAN_ALPHABET.length;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ZandHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
          <Text style={styles.backBtnText}>Learn</Text>
        </Pressable>

        <View style={styles.titleRow}>
          <Text style={styles.title}>Writing</Text>
          <Text style={styles.glyph}>نوشتن</Text>
        </View>
        <Text style={styles.subtitle}>Form each letter by hand. Follow the guide, then copy it onto paper.</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.strip} style={styles.stripScroll}>
          {PERSIAN_ALPHABET.map((l, idx) => (
            <Pressable key={l.char} style={[styles.chip, idx === i && styles.chipActive]} onPress={() => setI(idx)}>
              <Text style={[styles.chipText, idx === i && styles.chipTextActive]}>{l.char}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.letterName}>{letter.name}</Text>
            <Text style={styles.letterSound}>sounds like “{letter.sound}”</Text>
          </View>
          <Text style={styles.letterNum}>{String(i + 1).padStart(2, '0')} / {total}</Text>
        </View>

        {/* Model on ruled guides */}
        <View style={styles.model}>
          <View style={[styles.guideLine, styles.guideTop]} />
          <View style={[styles.guideLine, styles.guideMid]} />
          <View style={[styles.guideLine, styles.guideBase]} />
          <Text style={styles.modelLetter}>{letter.char}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoChip}><Text style={styles.infoLabel}>STROKES</Text><Text style={styles.infoValue}>{w.strokes}</Text></View>
          <View style={styles.infoChip}><Text style={styles.infoLabel}>DOTS</Text><Text style={styles.infoValueSm}>{w.dots}</Text></View>
        </View>

        <Text style={styles.tip}>{w.tip}</Text>
        {w.baseline ? (
          <View style={styles.baselineNote}>
            <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.baselineText}>{w.baseline}</Text>
          </View>
        ) : null}

        <Text style={styles.sectionLabel}>THE FOUR FORMS</Text>
        <View style={styles.formsRow}>
          {formValues.map((f, idx) => (
            <View key={idx} style={[styles.formCol, idx > 0 && styles.formColBorder]}>
              <Text style={styles.formGlyph}>{f}</Text>
              <Text style={styles.formLabel}>{FORM_LABELS[idx]}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>PRACTICE ON PAPER</Text>
        <View style={styles.practice}>
          <View style={[styles.guideLine, styles.practiceBase]} />
          <Text style={[styles.practiceGlyph, { opacity: 0.9 }]}>{letter.char}</Text>
          <Text style={[styles.practiceGlyph, { opacity: 0.45 }]}>{letter.char}</Text>
          <Text style={[styles.practiceGlyph, { opacity: 0.2 }]}>{letter.char}</Text>
          <Text style={[styles.practiceGlyph, { opacity: 0.1 }]}>{letter.char}</Text>
        </View>
        <Text style={styles.practiceCaption}>Copy the letter onto your own paper, working right to left.</Text>

        <View style={styles.nav}>
          <Pressable style={[styles.navBtn, i === 0 && styles.navDisabled]} disabled={i === 0} onPress={() => setI((v) => v - 1)}>
            <Ionicons name="chevron-back" size={18} color={i === 0 ? colors.border : colors.textPrimary} />
            <Text style={[styles.navText, i === 0 && styles.navTextDisabled]}>Previous</Text>
          </Pressable>
          <Pressable style={[styles.navBtn, i === total - 1 && styles.navDisabled]} disabled={i === total - 1} onPress={() => setI((v) => v + 1)}>
            <Text style={[styles.navText, i === total - 1 && styles.navTextDisabled]}>Next</Text>
            <Ionicons name="chevron-forward" size={18} color={i === total - 1 ? colors.border : colors.textPrimary} />
          </Pressable>
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

  stripScroll: { marginTop: spacing.lg },
  strip: { gap: spacing.sm, paddingRight: spacing.lg },
  chip: { width: 46, height: 46, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  chipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipText: { fontFamily: fonts.persian, fontSize: 24, color: colors.textPrimary },
  chipTextActive: { color: colors.surface },

  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl },
  letterName: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: colors.textPrimary },
  letterSound: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, marginTop: 2 },
  letterNum: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: colors.textSecondary },

  model: { height: 220, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, marginTop: spacing.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  guideLine: { position: 'absolute', left: spacing.lg, right: spacing.lg, height: 1 },
  guideTop: { top: 50, borderTopWidth: 1, borderColor: colors.border, borderStyle: 'dashed' },
  guideMid: { top: 110, borderTopWidth: 1, borderColor: colors.border, borderStyle: 'dashed' },
  guideBase: { top: 160, backgroundColor: colors.textSecondary, opacity: 0.4 },
  modelLetter: { fontFamily: fonts.persian, fontSize: 130, color: colors.textPrimary, marginTop: -6 },

  infoRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg },
  infoChip: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  infoLabel: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: colors.textSecondary },
  infoValue: { fontFamily: fonts.heading, fontSize: fontSize.xl, color: colors.accent, marginTop: 2 },
  infoValueSm: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textPrimary, marginTop: 4 },

  tip: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 24, color: colors.textPrimary, marginTop: spacing.lg },
  baselineNote: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.sm },
  baselineText: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, flex: 1 },

  sectionLabel: { fontFamily: fonts.bodyStrong, fontSize: fontSize.xs, letterSpacing: 2, color: colors.textSecondary, marginTop: spacing.xl, marginBottom: spacing.sm },
  formsRow: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border },
  formCol: { flex: 1, alignItems: 'center', paddingVertical: spacing.md },
  formColBorder: { borderLeftWidth: 1, borderLeftColor: colors.border },
  formGlyph: { fontFamily: fonts.persian, fontSize: 34, color: colors.textPrimary },
  formLabel: { fontFamily: fonts.bodyStrong, fontSize: 7, letterSpacing: 0.5, color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' },

  practice: { height: 120, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', overflow: 'hidden' },
  practiceBase: { position: 'absolute', left: spacing.md, right: spacing.md, top: 88, backgroundColor: colors.textSecondary, opacity: 0.3 },
  practiceGlyph: { fontFamily: fonts.persian, fontSize: 64, color: colors.textPrimary },
  practiceCaption: { fontFamily: fonts.body, fontSize: fontSize.sm, color: colors.textSecondary, marginTop: spacing.sm },

  nav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xl },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  navDisabled: { opacity: 0.5 },
  navText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: colors.textPrimary },
  navTextDisabled: { color: colors.border },
});
