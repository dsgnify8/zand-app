// The images behind Local's browsing pages.
//
// One backdrop behind the city list. A weekly rotation was tried and
// dropped: the four were not equally good, and changing for its own sake
// is change without a reason.
//
// City covers are bundled here as a fallback. An admin-set cover in the
// city_covers table always wins — see lib/city-covers.ts.

/** The one behind the city list. */
export const CITY_BACKDROP = require('../assets/cities/cities-backdrop-3.jpg');



/** Bundled city covers, keyed on the lowercased city name. */
export const CITY_COVERS: Record<string, any> = {
  london: require('../assets/cities/city-london.jpg'),
  dubai: require('../assets/cities/city-dubai.jpg'),
  doha: require('../assets/cities/city-doha.jpg'),
  'los angeles': require('../assets/cities/city-losangeles.jpg'),
  stockholm: require('../assets/cities/city-stockholm.jpg'),
};
