// Things the admin should hear about.
//
// Four moments: a listing sent for review, a listing taken out of the
// directory, a new account, and a listing whose name is close to one
// already here. The function on the other side decides who gets told and
// writes the sentence itself; this only says what happened.
//
// The last one is the franchise question. Two places called almost the
// same thing are usually a second branch and occasionally two unrelated
// shops, and that is not a judgement a form can make.
//
// Fire and forget, always. An alert that fails must never fail the thing
// it is about.

import { supabase } from '@/lib/supabase';

type Kind = 'listing-submitted' | 'listing-removed' | 'signup' | 'listing-similar';

export function alertAdmin(
  kind: Kind,
  about: { name?: string; city?: string; who?: string; like?: string } = {},
) {
  supabase.functions.invoke('admin-alert', {
    body: { kind, name: about.name, city: about.city, who: about.who, like: about.like },
  }).catch(() => {});
}
