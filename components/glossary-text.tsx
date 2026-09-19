import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, fontSize, radius, spacing } from '@/constants/zand-theme';
import { dark } from '@/constants/education';
import { findTerm } from '@/constants/glossary';
import { useGlossary } from '@/lib/glossary-store';
import { useLang, getLang } from '@/lib/i18n';
import { router } from 'expo-router';

// Renders a paragraph where {{term-id|visible text}} becomes a tappable link.
export function GlossaryText({ text, color }: {
  text: string;
  /** For pages that are not dark. The default suits the education
   *  reader; the Nowruz page is cream, and light-on-cream is invisible
   *  — the paragraph was rendering the whole time and could not be
   *  read, leaving only the gold link showing. */
  color?: string;
}) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const [openId, setOpenId] = useState<string | null>(null);
  const { isSaved, toggleSaved } = useGlossary();

  // Parse into segments
  const segments: { t: 'text' | 'link'; s: string; id?: string }[] = [];
  const re = /\{\{([^|}]+)\|([^}]+)\}\}/g;
  let last = 0; let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) segments.push({ t: 'text', s: text.slice(last, m.index) });
    segments.push({ t: 'link', s: m[2], id: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) segments.push({ t: 'text', s: text.slice(last) });

  const term = findTerm(openId ?? undefined);
  const saved = term ? isSaved(term.id) : false;

  return (
    <>
      <Text style={[styles.p, color ? { color } : null]}>
        {segments.map((seg, i) =>
          seg.t === 'text'
            ? <Text key={i}>{seg.s}</Text>
            : <Text key={i} style={styles.link} onPress={() => setOpenId(seg.id!)}>{seg.s}</Text>
        )}
      </Text>

      {null}
      <Modal visible={!!term} transparent animationType="fade" onRequestClose={() => setOpenId(null)}>
        <Pressable style={styles.backdrop} onPress={() => setOpenId(null)}>
          <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
            <View style={styles.cardHead}>
              <Text style={styles.cardEyebrow}>{fa ? 'او که بود' : 'WHO WAS'}</Text>
              <Pressable hitSlop={10} onPress={() => setOpenId(null)}>
                <Ionicons name="close" size={22} color={dark.textDim} />
              </Pressable>
            </View>
            <Text style={[styles.cardTitle, fa && (term as any)?.titleFa && { fontFamily: fonts.persian, textAlign: 'right', writingDirection: 'rtl' }]}>{fa && (term as any)?.titleFa ? (term as any).titleFa : term?.title}</Text>
            <Text style={[styles.cardDesc, fa && (term as any)?.descriptionFa && { fontFamily: fonts.persian, fontSize: 14, lineHeight: 28, textAlign: 'right', writingDirection: 'rtl' }]}>{fa && (term as any)?.descriptionFa ? (term as any).descriptionFa : term?.description}</Text>
            {(term as any)?.video ? (
              <Pressable
                style={styles.watchBtn}
                onPress={() => {
                  const to = (term as any).video;
                  setOpenId(null);
                  setTimeout(() => router.navigate(to as any), 180);
                }}
              >
                <Ionicons name="play-circle" size={18} color={dark.bg} />
                <Text style={styles.watchT}>{(term as any).videoLabel ?? 'Watch'}</Text>
              </Pressable>
            ) : null}

            {!(term as any)?.video ? (
              <Pressable
              style={[styles.saveBtn, saved && styles.saveBtnOn]}
              onPress={() => term && toggleSaved(term.id)}
            >
              <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color={saved ? dark.bg : dark.text} />
              <Text style={[styles.saveText, saved && styles.saveTextOn]}>{fa ? (saved ? 'ذخیره شد' : 'ذخیره کن برای بعد') : (saved ? 'Saved to read later' : 'Save to read later')}</Text>
            </Pressable>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  p: { fontFamily: fonts.body, fontSize: fontSize.base, lineHeight: 28, color: dark.text, marginTop: spacing.md, opacity: 0.92 },
  link: { color: dark.gold, textDecorationLine: 'underline' },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  card: { width: '86%', maxWidth: 300, backgroundColor: dark.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: dark.hair, padding: spacing.md },
  cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardEyebrow: { fontFamily: fonts.bodyStrong, fontSize: 10, letterSpacing: 1.5, color: dark.gold },
  cardTitle: { fontFamily: fonts.heading, fontSize: fontSize.lg, color: dark.text, marginTop: spacing.xs },
  cardDesc: { fontFamily: fonts.body, fontSize: fontSize.sm, lineHeight: 20, color: dark.text, opacity: 0.9, marginTop: spacing.xs },
  watchBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: dark.gold, borderRadius: 11, paddingVertical: 11, marginBottom: 8 },
  watchT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: dark.bg },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm, borderWidth: 1, borderColor: dark.hair, borderRadius: radius.pill, paddingVertical: spacing.sm, marginTop: spacing.md },
  saveBtnOn: { backgroundColor: dark.gold, borderColor: dark.gold },
  saveText: { fontFamily: fonts.bodyStrong, fontSize: fontSize.sm, color: dark.text },
  saveTextOn: { color: dark.bg },
});
