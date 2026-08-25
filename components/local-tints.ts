// One place for Local's colours.
//
// The category grid, the browse pages and the business page were each
// picking their own hues, which meant Bakeries could be gold in one place
// and brown in another. Colour is only useful for finding things if it is
// the same colour every time.

export const CAT_TINT: Record<string, string> = {
  restaurant: '#B4433F',
  cafe: '#8C6A3F',
  bakery: '#C08A33',
  grocery: '#6E8B4E',
  beauty: '#C4808B',
  clothing: '#7A6E9B',
  jewellery: '#B79246',
  repair: '#5E7A88',
  interior: '#8A7358',
  photo: '#4E6E7A',
  events: '#C46A8B',
  legal: '#5A6B7C',
  medical: '#4E8B7A',
  dental: '#5E9BA8',
};

/** Lifted for the dark browse pages, where the muted set goes muddy. */
export const CAT_TINT_DARK: Record<string, string> = {
  restaurant: '#D2695F',
  cafe: '#C09A6B',
  bakery: '#D9A94C',
  grocery: '#8FA86B',
  beauty: '#D69AA6',
  clothing: '#9B8FC4',
  jewellery: '#D4B45E',
  repair: '#7FA0B0',
  interior: '#B49A7A',
  photo: '#6E96A6',
  events: '#D68BAA',
  legal: '#8494A8',
  medical: '#6FB09B',
  dental: '#7FBAC8',
};

/**
 * The parts of a business page.
 *
 * Each section gets its own hue so someone scrolling for the opening hours
 * can find them by colour before they have read the label.
 */
export const ACT_TINT = {
  call: '#4E8B7A',
  directions: '#4E6E7A',
  website: '#7A6E9B',
  address: '#8C6A3F',
  hours: '#C08A33',
  social: '#C4808B',
  nearby: '#6E8B4E',
};

export const catTint = (key: string, dark = false) =>
  (dark ? CAT_TINT_DARK : CAT_TINT)[key] ?? (dark ? '#B9AFA8' : '#8C6A3F');
