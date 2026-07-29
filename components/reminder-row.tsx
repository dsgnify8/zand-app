import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { fonts, spacing } from '@/constants/zand-theme';
import { lw } from '@/constants/lang-theme';
import { useReminders, setReminders, setReminderHour } from '@/lib/reminders';

const HOURS = [7, 8, 9, 12, 17, 18, 19, 20, 21, 22];
const label = (h: number) => {
  const am = h < 12;
  const twelve = h % 12 === 0 ? 12 : h % 12;
  return twelve + (am ? ' am' : ' pm');
};

export function ReminderRow() {
  const { enabled, hour } = useReminders();
  const [picking, setPicking] = useState(false);
  const [busy, setBusy] = useState(false);

  return (
    <View style={s.wrap}>
      <View style={s.row}>
        <Ionicons name="notifications-outline" size={17} color={lw.green} />
        <View style={{ flex: 1 }}>
          <Text style={s.t}>Daily reminder</Text>
          <Text style={s.x}>One line a day, about where you left off.</Text>
        </View>
        <Switch
          value={enabled}
          disabled={busy}
          onValueChange={async (v) => { setBusy(true); await setReminders(v); setBusy(false); }}
          trackColor={{ true: lw.green, false: lw.hair }}
        />
      </View>

      {enabled ? (
        <Pressable style={s.timeRow} onPress={() => setPicking(true)}>
          <Text style={s.timeL}>Time</Text>
          <Text style={s.timeV}>{label(hour)}</Text>
          <Ionicons name="chevron-forward" size={14} color={lw.muted} />
        </Pressable>
      ) : null}

      <Modal transparent visible={picking} animationType="slide" onRequestClose={() => setPicking(false)}>
        <Pressable style={s.backdrop} onPress={() => setPicking(false)}>
          <Pressable style={s.sheet} onPress={() => {}}>
            <View style={s.grab} />
            <Text style={s.sheetT}>When should we ask?</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {HOURS.map((h) => (
                <Pressable key={h} style={s.hourRow} onPress={async () => { await setReminderHour(h); setPicking(false); }}>
                  <Text style={[s.hourT, h === hour && s.hourOn]}>{label(h)}</Text>
                  {h === hour ? <Ionicons name="checkmark" size={17} color={lw.green} /> : null}
                </Pressable>
              ))}
              <View style={{ height: spacing.xxl }} />
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { backgroundColor: lw.greenWash, borderRadius: 14, padding: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  t: { fontFamily: fonts.body, fontSize: 15, color: lw.ink },
  x: { fontFamily: fonts.body, fontSize: 11.5, color: lw.muted, marginTop: 2 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.8)' },
  timeL: { flex: 1, fontFamily: fonts.body, fontSize: 13.5, color: lw.inkSoft },
  timeV: { fontFamily: fonts.bodyStrong, fontSize: 13.5, color: lw.green },

  backdrop: { flex: 1, backgroundColor: 'rgba(20,26,20,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: lw.bg, borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: spacing.xl, paddingTop: spacing.sm, maxHeight: '62%' },
  grab: { width: 36, height: 4, borderRadius: 2, backgroundColor: lw.hair, alignSelf: 'center', marginBottom: spacing.lg },
  sheetT: { fontFamily: fonts.body, fontSize: 20, color: lw.ink, marginBottom: spacing.md },
  hourRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: lw.hair },
  hourT: { flex: 1, fontFamily: fonts.body, fontSize: 16, color: lw.ink },
  hourOn: { color: lw.green, fontFamily: fonts.bodyStrong },
});
