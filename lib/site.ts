/**
 * One source of truth for the things that were scattered across the codebase.
 * The phone number lived in six files, the Facebook URL in four and the
 * address in three — that is how a business ends up with a stale number on one
 * page and a fresh one on another.
 */
export const site = {
  name: "Simons Solfilm",
  url: "https://simonssolfilm.no",
  phone: {
    display: "974 74 347",
    href: "tel:+4797474347",
    e164: "+4797474347",
  },
  email: "post@simonssolfilm.no",
  address: {
    street: "Hegdalveien 65C",
    postal: "3261",
    city: "Larvik",
    lat: 59.053407,
    lng: 10.078789,
    // Exact coordinates, not the address string. Google geocoded the address
    // to a point that routed visitors the long way round the block; this pins
    // the entrance itself. It does not fix the route — that needs the access
    // road added to Google's own map data.
    maps: "https://www.google.com/maps/search/?api=1&query=59.053407,10.078789",
  },
  social: {
    instagram: "https://www.instagram.com/simonssolfilm/",
    facebook: "https://www.facebook.com/profile.php?id=100054592143676",
    youtube: "https://www.youtube.com/@Simonssolfilm",
    // A web-search URL is fragile and does not necessarily land on the
    // reviews. Maps does.
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=Simons+Solfilm+Hegdalveien+65c+Larvik",
  },
} as const;
