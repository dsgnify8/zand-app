// "New this week" — editorial content tied to a real person we've featured.
// Seed data: replace guestName/guestRole/title with real guests as they publish.

export type FeaturedItem = {
  id: string;
  format: 'Podcast' | 'Article' | 'Video';
  title: string;
  guestName: string;
  guestRole: string;
  blurb: string;
  route: string;
};

export const FEATURED: FeaturedItem[] = [
  {
    id: 'f1',
    format: 'Podcast',
    title: 'On clay, patience, and the shapes we inherit',
    guestName: 'Darya Amini',
    guestRole: 'Ceramicist',
    blurb: 'A conversation about learning a craft slowly, and what Persian form teaches the hands.',
    route: '/section/podcasts',
  },
  {
    id: 'f2',
    format: 'Article',
    title: 'The architect rebuilding gardens as quiet rooms',
    guestName: 'Kian Rostami',
    guestRole: 'Landscape architect',
    blurb: 'How the Persian garden becomes a blueprint for calm in modern cities.',
    route: '/section/articles',
  },
];

export function getNewThisWeek(): FeaturedItem {
  return FEATURED[0];
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
