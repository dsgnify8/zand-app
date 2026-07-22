// Achievement catalog. Add freely — the store only tracks earned ids, so this list can grow forever.
export type Achievement = {
  id: string;
  title: string;
  persian: string;
  description: string;
  icon: string; // Ionicons name
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-chapter', title: 'First Steps', persian: 'گام نخست', description: 'Read your first chapter.', icon: 'footsteps-outline' },
  { id: 'finish-topic', title: 'Devoted Reader', persian: 'خواننده', description: 'Finish a whole topic.', icon: 'book-outline' },
  { id: 'alphabet', title: 'Alphabet Learned', persian: 'الفبا', description: 'Learn all 34 letters.', icon: 'text-outline' },
  { id: 'streak-3', title: 'On Fire', persian: 'پیگیر', description: 'Keep a 3 day streak.', icon: 'flame-outline' },
  { id: 'streak-7', title: 'Steadfast', persian: 'استوار', description: 'Keep a 7 day streak.', icon: 'shield-checkmark-outline' },
  { id: 'topics-3', title: 'Scholar', persian: 'دانش‌پژوه', description: 'Finish three topics.', icon: 'school-outline' },
  { id: 'topics-5', title: 'Historian', persian: 'تاریخ‌دان', description: 'Finish five topics.', icon: 'library-outline' },
];

export function findAchievement(id: string) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
