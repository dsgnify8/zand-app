// Links that leave the app.
//
// They lived inline in three files and pointed at zand.app, a domain
// nobody owns, so every shared invite landed on a 404. One constant
// here, and the site can change without touching the screens.
//
// zandapplication.com/add and /folder hand back to the app: with the
// association file in place iOS opens ZAND directly, and anyone without
// it gets the page and the App Store.

export const SITE = 'https://zandapplication.com';
export const APP_STORE = 'https://apps.apple.com/app/id6807573204';

/**
 * An invitation.
 *
 * Carries a token rather than the inviter's user id. An id is not a secret
 * — any signed-in person can read the profiles table — so it could never
 * be the thing that proves somebody was invited. A token only ever exists
 * in a link its owner chose to send, which is exactly what we need it to
 * mean. invite_token() on the server mints it.
 */
export function inviteLink(token?: string | null): string {
  return `${SITE}/add${token ? `?i=${encodeURIComponent(token)}` : ''}`;
}

export function folderLink(token: string): string {
  return `${SITE}/folder?t=${encodeURIComponent(token)}`;
}

/** What a friend receives. */
export function inviteMessage(token?: string | null): string {
  return `Join my Iranian world on ZAND. ${inviteLink(token)}`;
}

/**
 * A listing's page on the site.
 *
 * The slug is built the same way the website builds it, from the name
 * and the city, because the site has no id in its URLs. Keep the two in
 * step: a change here needs the same change there.
 */
export function businessSlug(name: string, city?: string | null): string {
  return (name + '-' + (city ?? ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function businessLink(name: string, city?: string | null, fa = false): string {
  return `${SITE}/${fa ? 'fa' : 'en'}/local/${businessSlug(name, city)}`;
}
