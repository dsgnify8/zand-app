// Deep links used to be handled here. They are routes now.
//
// This hook parsed the incoming URL itself and did the work — made the
// friendship, joined the folder, looked up the listing. The trouble was
// that expo-router was routing the same URL at the same time, to a path
// with no screen behind it, and an unmatched route draws nothing. So the
// side effects happened and the person saw a black screen.
//
// The screens own it now, one per shape of link, each reading its own
// params: app/add.tsx, app/folder.tsx, app/en/local/[slug].tsx and
// app/fa/local/[slug].tsx, with app/+not-found.tsx under all of them. That
// is how expo-router is meant to be used, and it means the cold start and
// the warm event are handled by the framework rather than by us.
//
// Kept as a no-op rather than deleted so that a build which still calls it
// does not fail to compile. Nothing should call it.

/** @deprecated The link routes handle this. Does nothing. */
export function useFriendDeepLink(_myId?: string | undefined) {
  // Deliberately empty. Doing the work here as well as in the routes sent
  // two friend requests for one tap.
}
