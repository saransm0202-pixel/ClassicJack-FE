/**
 * Single source of truth for brand + contact configuration.
 * Update values here once; every component consumes from this module.
 */
export const SITE = {
  brand: 'Classic Jack Construction',
  brandShort: 'Classic Jack',
  brandInitials: 'CJC',
  tagline: 'Building Spaces. Creating Legacies.',
  support: 'From the first sketch to the final key, we build homes with precision, transparency and timeless craftsmanship.',

  phoneDisplay: '+91 90000 00000',
  phoneHref: 'tel:+919000000000',

  whatsappNumber: '919000000000',
  whatsappMessage: "Hello Classic Jack Construction, I'd like to discuss a construction project.",
  email: 'hello@classicjackconstruction.com',
  address: 'No. 12, Anna Salai, Guindy, Chennai, Tamil Nadu 600032',
  city: 'Chennai',

  hours: 'Mon – Sat · 9:00 AM – 7:00 PM',

  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
  },

  availableLocations: [
    'Chennai',
    'Chengalpattu',
    'Kanchipuram',
    'Pondicherry',
    'Vellore',
    'Tiruvallur',
  ],
} as const;

export const WHATSAPP_URL = (() => {
  const text = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
})();

export const DEFAULT_PRELOADER_DURATION = 1800;

export const COST_DISCLAIMER =
  'This is an indicative estimate. Final pricing will depend on design, site conditions, specifications and approvals.';