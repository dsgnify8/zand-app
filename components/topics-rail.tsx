// The topics, spelled out under the title.
//
// This replaces the rotated hamburger. A mark in the corner had to be found
// and then opened before it told you anything; this says what is on the page
// without being asked, which is the whole job.
//
// It speaks in the kicker's voice — the same small letterspaced caps as
// "EVERYTHING WE HAVE" — but faded back, because it is a signpost and the
// title is the thing. Deliberately wider than the screen, so the last item
// is cut and the row reads as draggable without needing to say so.

import { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { colors, fonts, spacing } from '@/constants/zand-theme';
import { useLang, getLang } from '@/lib/i18n';

type Topic = { id: string; en: string; fa: string; route: string };

// Page order, so the rail and the scroll agree.
const TOPICS: Topic[] = [
  { id: 'history', en: 'History', fa: 'تاریخ', route: '/education/history' },
  { id: 'geography', en: 'Geography', fa: 'جغرافیا', route: '/geography' },
  { id: 'literature', en: 'Literature', fa: 'ادبیات', route: '/literature' },
  { id: 'culture', en: 'Culture', fa: 'فرهنگ', route: '/culture' },
  { id: 'traditions', en: 'Traditions', fa: 'آیین‌ها', route: '/traditions' },
  { id: 'language', en: 'Language', fa: 'زبان', route: '/language' },
];

const FADE_W = 28;

export function TopicsRail({ bleed = spacing.lg }: { bleed?: number }) {
  // Subscribe to the language so a switch elsewhere reaches this screen
  // where it stands. The value is deliberately unused: read with
  // getLang() or t(), which are always current.
  useLang();
  const fa = getLang() === 'fa';
  const ref = useRef<ScrollView>(null);
  const [ready, setReady] = useState(false);

  // Persian reads from the right, so the row has to start there. A horizontal
  // ScrollView always opens at its left edge, so the list is reversed and
  // then jumped to the end — which puts the first topic under the reader's
  // thumb rather than off the far side of the screen.
  const items = fa ? [...TOPICS].reverse() : TOPICS;

  useEffect(() => {
    if (fa && ready) ref.current?.scrollToEnd({ animated: false });
  }, [fa, ready]);

  const bg = colors.background;

  return (
    <View style={[st.wrap, { marginHorizontal: -bleed }]}>
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[st.row, { paddingHorizontal: bleed }]}
        onContentSizeChange={() => setReady(true)}
      >
        {items.map((topic) => (
          <Pressable
            key={topic.id}
            hitSlop={8}
            onPress={() => router.navigate(topic.route as any)}
          >
            <Text style={[st.item, fa && st.itemFa]}>{fa ? topic.fa : topic.en}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* The row runs off both edges rather than stopping at them. */}
      <LinearGradient
        pointerEvents="none"
        colors={[bg, bg + '00']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[st.fade, { left: 0, width: FADE_W }]}
      />
      <LinearGradient
        pointerEvents="none"
        colors={[bg + '00', bg]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[st.fade, { right: 0, width: FADE_W }]}
      />
    </View>
  );
}

const st = StyleSheet.create({
  // The header centres its children, so without this the rail would size
  // to its content and sit in the middle rather than running off both edges.
  // More room, and more air under it. At the old size the rule sat close
  // enough to the labels to read as an underline on all of them rather
  // than as a line the selection travels along.
  wrap: { marginTop: 18, alignSelf: 'stretch' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 26 },

  // The kicker's voice, stepped back: same letterspacing, less presence.
  item: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    letterSpacing: 2.6,
    textTransform: 'uppercase',
    color: colors.textSecondary,
    opacity: 0.55,
    paddingVertical: 10,
  },
  // Persian has no capitals, and letterspacing pulls its joined letters
  // apart, so neither applies here.
  itemFa: {
    fontFamily: fonts.persian,
    fontSize: 15,
    letterSpacing: 0,
    textTransform: 'none',
    writingDirection: 'rtl',
  },

  fade: { position: 'absolute', top: 0, bottom: 0 },
});
