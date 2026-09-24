// Things the admin should hear about.
//
// Three moments: a listing sent for review, a listing taken out of the
// directory, and a new account. The function on the other side decides
// who gets told and writes the sentence itself; this only says what
// happened.
//
// Fire and forget, always. An alert that fails must never fail the thing
// it is about.

import { supabase } from '@/lib/supabase';

type Kind = 'listing-submitted' | 'listing-removed' | 'signup';

export function alertAdmin(kind: Kind, about: { name?: string; city?: string; who?: string } = {}) {
  supabase.functions.invoke('admin-alert', {
    body: { kind, name: about.name, city: about.city, who: about.who },
  }).catch(() => {});
}
