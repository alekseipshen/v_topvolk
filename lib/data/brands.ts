// Top 20 most popular appliance brands in USA (featured on homepage)
export const FEATURED_BRANDS = [
  'whirlpool', 'ge-appliances', 'samsung', 'lg', 'maytag',
  'frigidaire', 'kitchenaid', 'bosch', 'electrolux', 'kenmore',
  'amana', 'thermador', 'sub-zero', 'viking', 'miele',
  'haier', 'ge-profile', 'fisher-paykel', 'speed-queen', 'cafe'
];

export interface Brand {
  slug: string;
  name: string;
  logo?: string;
}

export const brands: Brand[] = [
  // Top 20 Featured Brands (most popular in USA)
  { slug: 'whirlpool', name: 'Whirlpool', logo: '/brands/whirlpool.png' },
  { slug: 'ge-appliances', name: 'GE Appliances', logo: '/brands/ge-appliances.png' },
  { slug: 'samsung', name: 'Samsung', logo: '/brands/samsung.png' },
  { slug: 'lg', name: 'LG', logo: '/brands/lg.png' },
  { slug: 'maytag', name: 'Maytag', logo: '/brands/maytag.png' },
  { slug: 'frigidaire', name: 'Frigidaire', logo: '/brands/frigidaire.png' },
  { slug: 'kitchenaid', name: 'KitchenAid', logo: '/brands/kitchenaid.png' },
  { slug: 'bosch', name: 'Bosch', logo: '/brands/bosch.png' },
  { slug: 'electrolux', name: 'Electrolux', logo: '/brands/electrolux.png' },
  { slug: 'kenmore', name: 'Kenmore', logo: '/brands/kenmore.png' },
  { slug: 'amana', name: 'Amana', logo: '/brands/amana.png' },
  { slug: 'thermador', name: 'Thermador', logo: '/brands/thermador.png' },
  { slug: 'sub-zero', name: 'Sub-Zero', logo: '/brands/sub-zero.png' },
  { slug: 'viking', name: 'Viking', logo: '/brands/viking.png' },
  { slug: 'miele', name: 'Miele', logo: '/brands/miele.png' },
  { slug: 'haier', name: 'Haier', logo: '/brands/haier.png' },
  { slug: 'ge-profile', name: 'GE Profile', logo: '/brands/ge-profile.png' },
  { slug: 'fisher-paykel', name: 'Fisher & Paykel', logo: '/brands/fisher-paykel.png' },
  { slug: 'speed-queen', name: 'Speed Queen', logo: '/brands/speed-queen.png' },
  { slug: 'cafe', name: 'Café', logo: '/brands/cafe.png' },
  
  // Other brands with logos (alphabetically)
  { slug: 'admiral', name: 'Admiral', logo: '/brands/admiral.png' },
  { slug: 'aeg', name: 'AEG', logo: '/brands/aeg.png' },
  { slug: 'asko', name: 'ASKO', logo: '/brands/asko.png' },
  { slug: 'avanti', name: 'Avanti', logo: '/brands/avanti.webp' },
  { slug: 'bertazzoni', name: 'Bertazzoni', logo: '/brands/bertazzoni.png' },
  { slug: 'blomberg', name: 'Blomberg', logo: '/brands/blomberg.png' },
  { slug: 'broan', name: 'Broan', logo: '/brands/broan.png' },
  { slug: 'caloric', name: 'Caloric', logo: '/brands/caloric.webp' },
  { slug: 'crosley', name: 'Crosley', logo: '/brands/crosley.png' },
  { slug: 'dacor', name: 'Dacor', logo: '/brands/dacor.png' },
  { slug: 'danby', name: 'Danby', logo: '/brands/danby.png' },
  { slug: 'estate', name: 'Estate', logo: '/brands/estate.png' },
  { slug: 'fagor', name: 'Fagor', logo: '/brands/fagor.png' },
  { slug: 'gaggenau', name: 'Gaggenau', logo: '/brands/gaggenau.svg' },
  { slug: 'ge', name: 'GE', logo: '/brands/ge.png' },
  { slug: 'general-electric', name: 'General Electric', logo: '/brands/ge.png' },
  { slug: 'gibson', name: 'Gibson', logo: '/brands/gibson.svg' },
  { slug: 'gorenje', name: 'Gorenje', logo: '/brands/gorenje.svg' },
  { slug: 'haas', name: 'Haas', logo: '/brands/haas.png' },
  { slug: 'hahn', name: 'Hahn', logo: '/brands/hahn.webp' },
  { slug: 'hamilton-beach', name: 'Hamilton Beach', logo: '/brands/hamilton-beach.png' },
  { slug: 'hisense', name: 'Hisense', logo: '/brands/hisense.svg' },
  { slug: 'hotpoint', name: 'Hotpoint', logo: '/brands/hotpoint.png' },
  { slug: 'ikea', name: 'IKEA', logo: '/brands/ikea.png' },
  { slug: 'jenn-air', name: 'Jenn-Air', logo: '/brands/jenn-air.png' },
  { slug: 'jennair', name: 'JennAir', logo: '/brands/jennair.png' },
  { slug: 'kelvinator', name: 'Kelvinator', logo: '/brands/kelvinator.png' },
  { slug: 'kuppersbusch', name: 'Küppersbusch', logo: '/brands/kuppersbusch.png' },
  { slug: 'liebherr', name: 'Liebherr', logo: '/brands/liebherr.png' },
  { slug: 'magic-chef', name: 'Magic Chef', logo: '/brands/magic-chef.png' },
  { slug: 'marvel', name: 'Marvel', logo: '/brands/marvel.avif' },
  { slug: 'monogram', name: 'Monogram', logo: '/brands/monogram.png' },
  { slug: 'neff', name: 'Neff', logo: '/brands/neff.png' },
  { slug: 'norge', name: 'Norge', logo: '/brands/norge.png' },
  { slug: 'nutone', name: 'NuTone', logo: '/brands/nutone.png' },
  { slug: 'perlick', name: 'Perlick', logo: '/brands/perlick.png' },
  { slug: 'premier', name: 'Premier', logo: '/brands/premier.png' },
  { slug: 'rca', name: 'RCA', logo: '/brands/rca.png' },
  { slug: 'roper', name: 'Roper', logo: '/brands/roper.webp' },
  { slug: 'scotsman', name: 'Scotsman', logo: '/brands/scotsman.svg' },
  { slug: 'sears', name: 'Sears', logo: '/brands/sears.webp' },
  { slug: 'sharp', name: 'Sharp', logo: '/brands/sharp.png' },
  { slug: 'signature', name: 'Signature', logo: '/brands/signature.png' },
  { slug: 'smeg', name: 'Smeg', logo: '/brands/smeg.png' },
  { slug: 'tappan', name: 'Tappan', logo: '/brands/tappan.png' },
  { slug: 'true', name: 'True', logo: '/brands/true.png' },
  { slug: 'u-line', name: 'U-Line', logo: '/brands/u-line.png' },
  { slug: 'westinghouse', name: 'Westinghouse', logo: '/brands/westinghouse.png' },
  { slug: 'wolf', name: 'Wolf', logo: '/brands/wolf.png' },
  { slug: 'zephyr', name: 'Zephyr', logo: '/brands/zephyr.png' }
];

export const getFeaturedBrands = () => brands.filter(b => FEATURED_BRANDS.includes(b.slug));
export const getOtherBrands = () => brands.filter(b => !FEATURED_BRANDS.includes(b.slug));
