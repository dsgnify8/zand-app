import { SectionHub, type HubItem } from '@/components/section-hub';

const ITEMS: HubItem[] = [
  { key: 'episodes', title: 'Episodes', persian: 'قسمت‌ها', description: 'Full conversations to listen through.', status: 'soon' },
  { key: 'clips', title: 'Clips', persian: 'کلیپ‌ها', description: 'Short moments worth sharing.', status: 'soon' },
  { key: 'playlists', title: 'Playlists', persian: 'فهرست‌ها', description: 'Grouped by theme and guest.', status: 'soon' },
];

export default function PodcastsScreen() {
  return (
    <SectionHub showBack backLabel="Explore" glyph="پادکست‌ها" title="Podcasts"
      subtitle="Listen to conversations and clips." items={ITEMS} />
  );
}
