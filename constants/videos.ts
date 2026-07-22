// Curated YouTube playlists. Add new videos by pasting their ID (the part
// after youtu.be/ or watch?v=). Titles/channels/thumbnails load automatically.

export type YTVideo = { id: string; season?: string };

export type Playlist = {
  key: string;
  title: string;
  persian?: string;
  videos: YTVideo[];
};

export const PLAYLISTS: Playlist[] = [
  {
    key: 'reza-shah',
    title: 'Reza Shah',
    persian: 'رضا شاه',
    videos: [
      { id: 'eIvty0TN5Sk' },
      { id: 'EUJPZhIGR0w' },
      { id: 'i8-BoWnuCgY' },
      { id: 'roY9rowBV9c' },
    ],
  },
  {
    key: 'arya-mehr',
    title: 'Arya Mehr',
    persian: 'آریامهر',
    videos: [
      { id: 'NgqiTstAgdc' },
      { id: 'TFzqMDLFSa4' },
      { id: 'wESDcN-GoKk' },
      { id: 'r-14u7rA5ug' },
      { id: '1umNa1gHjb4' },
      { id: '953VND21J1g' },
      { id: '9Us2JSNhzRo' },
      { id: 'i9HIi7rWMUg' },
      { id: 'j6Khs1VGlqU' },
    ],
  },
  {
    key: 'shahbanou',
    title: 'The Shahbanou of Iran',
    persian: 'شهبانو',
    videos: [
      { id: 'zsV713Tu43s' },
      { id: 'nf6HbZ3YR0U' },
      { id: 'au3LGoUcoIg' },
      { id: 'e72RSnbBx9I' },
      { id: 'IgQ2eruVhE4' },
    ],
  },
  {
    key: 'hoveyda',
    title: 'Hoveyda',
    persian: 'هویدا',
    videos: [
      { id: 'NJK7MxzdxqY' },
      { id: 'qj8iTdlfq00' },
      { id: 'JxxhLUKnT-4' },
      { id: '_JV6VZlbnp4' },
      { id: 'xkW4eC2HVjc' },
      { id: '5318qDkcYnE' },
      { id: 'PH5uCsRXkIw' },
    ],
  },
  {
    key: 'iran-crisis-1946',
    title: 'Iran Crisis 1946',
    persian: 'بحران ۱۹۴۶',
    videos: [
      { id: '0m63X16XjTQ' },
    ],
  },
  {
    key: 'iranian-revolution',
    title: 'Iranian Revolution',
    persian: 'انقلاب',
    videos: [
      { id: 'lGdSQZSIpi4', season: 'Part 1' },
      { id: 'vICZV1bq1NA', season: 'Part 1' },
      { id: 'Xekn9SVPRmY', season: 'Part 1' },
      { id: 'h6q7xEket94', season: 'Part 1' },
      { id: 'ohtOl16FJlM', season: 'Part 1' },
      { id: 'yaeIknEe4qY', season: 'Part 2' },
      { id: 'mCWnEaZAczI', season: 'Part 2' },
      { id: 'kKtCj9gUlTs', season: 'Part 2' },
      { id: 'NZMoveEpM_A', season: 'Part 2' },
      { id: 'ChXlfwcVDkw', season: 'Part 2' },
    ],
  },
  {
    key: 'cyrus-the-great',
    title: 'Cyrus the Great',
    persian: 'کوروش بزرگ',
    videos: [
      { id: 'BF0OjIfypmU', season: 'Part 1' },
      { id: 'e11hyWvAw-o', season: 'Part 1' },
      { id: 'RGUpatTrvXM', season: 'Part 1' },
      { id: '9ODrngFo4m4', season: 'Part 1' },
      { id: 'nC_KiQahi88', season: 'Part 1' },
      { id: 'xskqd8HZuOs', season: 'Part 2' },
      { id: '1V9_goNMJw4', season: 'Part 2' },
      { id: 'twRiE98w7sk', season: 'Part 2' },
      { id: 'tT5HbJTVIUY', season: 'Part 2' },
      { id: 'Fy2vyosxfMg', season: 'Part 2' },
      { id: 'ZC1QDWqusAA', season: 'Part 2' },
    ],
  },
];
