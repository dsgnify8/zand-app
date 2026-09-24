// Pressing a tab you are already on takes you back to the top.
//
// The navigator knows the tab was pressed; only the screen knows what is
// scrolling. So each page leaves a way to send itself home, and the tab
// bar calls it. A map rather than a context because the tab bar sits
// outside the screens it is talking to.

type Handler = () => void;

const handlers: Record<string, Handler> = {};

/** Call the returned function when the screen goes away. */
export function registerScrollTop(key: string, fn: Handler) {
  handlers[key] = fn;
  return () => { if (handlers[key] === fn) delete handlers[key]; };
}

export function scrollTabToTop(key: string) {
  handlers[key]?.();
}
