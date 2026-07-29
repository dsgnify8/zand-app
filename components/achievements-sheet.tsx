import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useStats, milestoneStatus } from '@/lib/stats-store';
import { t, useLang } from '@/lib/i18n';
import { APP } from '@/constants/i18n/app';

export function AchievementsSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const stats = useStats();
  const miles = milestoneStatus(stats);
  const unlocked = miles.filter((m) => m.achieved).length;

  return (
    <Modal transparent visible={open} animationType="slide" onRequestClose={onClose}>
      <Pressable style={s.backdrop} onPress={onClose}>
        <Pressable style={s.sheet} onPress={() => {}}>
          <View style={s.grab} />
          <View style={s.head}>
            <View>
              <Text style={s.title}>{t(APP.achievements)}</Text>
              <Text style={s.sub}>{unlocked} of {miles.length} unlocked</Text>
            </View>
            <Pressable hitSlop={10} onPress={onClose}><Ionicons name="close" size={22} color={colors.textPrimary} /></Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
            <View style={s.grid}>
              {miles.map((m) => (
                <View key={m.key} style={[s.card, m.achieved && s.cardOn]}>
                  <View style={[s.badge, m.achieved && s.badgeOn]}>
                    <Ionicons name={m.achieved ? 'trophy' : 'lock-closed-outline'} size={22} color={m.achieved ? '#8A6D1F' : colors.textSecondary} />
                  </View>
                  <Text style={[s.cardT, m.achieved && s.cardTOn]}>{m.label}</Text>
                  {m.achieved ? (
                    <Text style={s.unlocked}>{t(APP.unlocked)}</Text>
                  ) : (
                    <>
                      <View style={s.track}><View style={[s.fill, { width: (m.pct + '%') as any }]} /></View>
                      <Text style={s.prog}>{m.current} / {m.target}</Text>
                    </>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.background, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, maxHeight: '82%' },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: colors.border, alignSelf: 'center', marginBottom: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg },
  title: { fontFamily: fonts.heading, fontSize: 26, color: colors.textPrimary },
  sub: { fontFamily: fonts.body, fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  card: { width: '47%', backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, alignItems: 'center' },
  cardOn: { backgroundColor: '#FBF3DC', borderColor: '#E7CE8E' },
  badge: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  badgeOn: { backgroundColor: '#F0DEA8' },
  cardT: { fontFamily: fonts.bodyStrong, fontSize: 13, color: colors.textPrimary, textAlign: 'center' },
  cardTOn: { color: '#6E571A' },
  unlocked: { fontFamily: fonts.bodyStrong, fontSize: 8, letterSpacing: 1.5, color: '#8A6D1F', marginTop: spacing.sm },
  track: { height: 4, borderRadius: 2, backgroundColor: colors.border, marginTop: spacing.md, overflow: 'hidden', width: '100%' },
  fill: { height: 4, borderRadius: 2, backgroundColor: colors.accent },
  prog: { fontFamily: fonts.body, fontSize: 10, color: colors.textSecondary, marginTop: 5 },
});
