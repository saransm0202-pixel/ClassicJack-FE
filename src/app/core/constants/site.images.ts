/**
 * Centralized image registry.
 * All image URLs live here so templates never scatter image paths.
 * Unsplash CDN is used for premium, consistent architectural photography.
 */
export type ImageSpec = { id: string; alt: string };

const u = (id: string, w = 1600): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const SITE_IMAGES = {
hero: {
    main: '/assets/hero/herobanner.png',
    alt: 'Modern luxury residence by Classic Jack Construction',
  },
  about: {
    main: u('photo-1600566753190-17f0baa2a6c3', 1400),
    stacked: u('photo-1564013799919-ab600027ffc6', 1000),
    alt: 'Architectural detailing of a premium custom-built home',
  },
  blueprint: {
    lines: u('photo-1600607687939-ce8a6c25118c', 1600),
    alt: 'Architectural blueprint of a residential project',
  },
  timeline: {
    plot: u('photo-1504307651254-35680f356dfd', 1600),
    foundation: u('photo-1541888946425-d81bb19240f5', 1600),
    structure: u('photo-1600607687939-ce8a6c25118c', 1600),
    brickwork: u('photo-1581094794329-c8112a89af12', 1600),
    interiors: u('photo-1580587771525-78b9dba3b914', 1600),
    completed: u('photo-1600585152915-d208bec867a1', 1600),
  },
  cta: {
    background: u('photo-1613977257363-707ba9348227', 2400),
    alt: 'Warmly lit premium home interior at night',
  },
  packages: {
    budget: u('photo-1523217582562-09d0def993a6', 1000),
    standard: u('photo-1600585152915-d208bec867a1', 1000),
    premium: u('photo-1512917774080-9991f1c4c750', 1000),
    luxury: u('photo-1600607687920-4e2a09cf159d', 1000),
  },
  process: {
    main: u('photo-1487958449943-2429e8be8625', 2000),
    alt: 'White modern architecture against a blue sky',
  },
  contact: {
    main: u('photo-1517581177682-a085bb7ffb15', 2000),
    alt: 'Glossy modern building exterior at dusk',
  },
} as const;

/**
 * Project + gallery imagery used in data files.
 */
export const PROJECT_IMAGES = {
  aarumugam: u('photo-1600607687939-ce8a6c25118c', 1600),
  murali: u('photo-1600585154340-be6161a56a0c', 1600),
  natarajan: u('photo-1564013799919-ab600027ffc6', 1600),
  chandrasekar: u('photo-1600607687920-4e2a09cf159d', 1600),
  selvaraj: u('photo-1600573472592-401b489a3cdc', 1600),
  vasanth: u('photo-1512917774080-9991f1c4c750', 1600),
  venkatesh: u('photo-1600047509807-ba8f99d2cdde', 1600),
  interior1: u('photo-1580587771525-78b9dba3b914', 1600),
  interior2: u('photo-1618221195710-dd6b41faaea6', 1600),
  interior3: u('photo-1613977257363-707ba9348227', 1600),
  interior4: u('photo-1600210492486-724fe5c67fb0', 1600),
  interior5: u('photo-1600566752355-35792bedcfea', 1600),
  interior6: u('photo-1600607687644-c7171b42498f', 1600),
  interior7: u('photo-1544568100-847a948585b9', 1600),
  interior8: u('photo-1505693416388-ac5ce068fe85', 1600),
  villa: u('photo-1545558014-8692077e9b5c', 1600),
  facade1: u('photo-1600585154350-250c0e2d45f9', 1600),
  facade2: u('photo-1600566752355-35792bedcfea', 1600),
  structure: u('photo-1600607687939-ce8a6c25118c', 1600),
} as const;

export const FALLBACK_GRADIENT =
  'linear-gradient(135deg, #1c1a16 0%, #2a241c 50%, #1c1a16 100%)';