import { SectionHub, type HubItem } from '@/components/section-hub';

const ITEMS: HubItem[] = [
  { key: 'makers', title: 'Featured makers', persian: 'سازندگان', description: 'Products from artists and makers we admire.', status: 'soon' },
  { key: 'new', title: 'New arrivals', persian: 'تازه‌ها', description: 'The latest additions to the shop.', status: 'soon' },
];

export default function ShopScreen() {
  return (
    <SectionHub
      glyph="فروشگاه"
      title="Shop"
      subtitle="Objects and works from featured Persian artists and makers."
      items={ITEMS}
    />
  );
}
