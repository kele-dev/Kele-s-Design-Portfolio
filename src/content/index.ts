// Single source of truth for all site copy & content.
// Edit here instead of digging through components.

/* ---------------------------------- Headlines ---------------------------------- */

export interface HeadlinePhrase {
  line1: string
  line2: string
}

export const headlines: HeadlinePhrase[] = [
  { line1: 'Bringing Ideas', line2: '& Impact' },
  { line1: 'Solving Complex', line2: 'Problems' },
  { line1: 'Elevating Local', line2: 'Brands' },
  { line1: 'Driving Business', line2: 'Growth' },
  { line1: 'Creating Visual', line2: 'Value' }
]

/* ----------------------------------- Skills ------------------------------------ */

export const skills: string[] = [
  'Full Brand Identity',
  'Logo Motion Design',
  'Website Design & UI/UX',
  'UMKM Branding Upgrade',
  'Experimental Typography',
  'Packaging & Merch Design',
  'Vector Illustration'
]

/* ---------------------------------- Projects ----------------------------------- */

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  badge?: string
  mediaFormats: string
  shortDesc: string
  image: string
  slides?: string[]
  client: string
  year: string
  role: string
  challenge: string
  solution: string
}

export const categories: string[] = ['All', 'Full Brand Systems', 'F&B & Retail', 'Web & Digital', 'Fashion & Corporate']

export const projects: Project[] = [
  {
    id: 1,
    slug: 'kele-artisan-coffee',
    title: 'Kele Artisan Coffee & Bakery Identity',
    category: 'Full Brand Systems',
    badge: '⭐ Full Identity',
    mediaFormats: 'Logo System • Guidelines • Merchandise • Packaging',
    shortDesc: 'Sistem identitas merek komplit dari konstruksi logo, panduan warna, hingga kaos merchandise dan stiker kemasan.',
    image: '/assets/branding_mockup.png',
    slides: [
      '/assets/branding_mockup.png',
      '/assets/illustration_mockup.png',
      '/assets/typography_mockup.png'
    ],
    client: 'Kele Coffee Co. (UMKM Partner)',
    year: '2024',
    role: 'Lead Brand System Designer',
    challenge: 'Usaha lokal kedai kopi & bakery membutuhkan identitas visual utuh dari logo hingga merch agar mampu bersaing dengan waralaba kopi besar.',
    solution: 'Mendesain logogram geometris bermotif setengah lingkaran yang fleksibel diaplikasikan pada mug, kaos tim, kantong kemasan, serta stiker promo.'
  },
  {
    id: 2,
    slug: 'space-explorer-saas',
    title: 'Space Explorer SaaS Web App',
    category: 'Web & Digital',
    badge: '🌐 Web Design',
    mediaFormats: 'Website Design • UI/UX • Interactive Landing Page',
    shortDesc: 'Desain website antarmuka interaktif dan landing page promosi aplikasi dengan visualisasi data gelap imersif.',
    image: '/assets/ui_ux_mockup.png',
    slides: [
      '/assets/ui_ux_mockup.png',
      '/assets/typography_mockup.png'
    ],
    client: 'Galaxy Works Studio',
    year: '2025',
    role: 'Web UI/UX Designer',
    challenge: 'Merancang tata letak website yang responsif dan menyajikan fitur aplikasi digital secara visual tanpa membingungkan calon pembeli.',
    solution: 'Membangun antarmuka bertema gelap pekat dengan efek glow-orb pada navigasi dan kartu glassmorphism yang responsif di seluruh layar.'
  },
  {
    id: 3,
    slug: 'artisan-culinary-menu',
    title: 'Artisan Culinary & Menu Suite',
    category: 'F&B & Retail',
    badge: '🌱 UMKM Partner',
    mediaFormats: 'Social Media Feed • Menu Poster • POS Display',
    shortDesc: 'Koleksi materi promosi cetak & digital tempat makan lokal meliputi menu fisik, feed Instagram, dan banner toko.',
    image: '/assets/illustration_mockup.png',
    slides: [
      '/assets/illustration_mockup.png',
      '/assets/branding_mockup.png'
    ],
    client: 'Warung Kuliner Nusantara (UMKM)',
    year: '2024',
    role: 'F&B Visual Designer',
    challenge: 'Meningkatkan penjualan tempat makan lokal dengan memperbaiki hirarki baca poster menu dan visual feed promo sosial media.',
    solution: 'Menerapkan tipografi menu legibel, penataan foto hidangan unggulan yang memikat selera makan, dan layout poster promo cetak yang tajam.'
  },
  {
    id: 4,
    slug: 'urban-apparel-streetwear',
    title: 'Urban Apparel & Streetwear Suite',
    category: 'Fashion & Corporate',
    badge: '⭐ Full Identity',
    mediaFormats: 'Lookbook Feed • Merchandise • Launch Poster',
    shortDesc: 'Desain kampanye brand pakaian street-style meliputi seri poster acara, merchandise kaos, dan lookbook sosial media.',
    image: '/assets/typography_mockup.png',
    slides: [
      '/assets/typography_mockup.png',
      '/assets/branding_mockup.png'
    ],
    client: 'Synergy Urban Apparel',
    year: '2024',
    role: 'Fashion Campaign & Merch Designer',
    challenge: 'Membuat visual rilis produk pakaian street-style yang berani, artistik, dan mencolok di keramaian feed sosial media.',
    solution: 'Menggabungkan tipografi distorsi geometris Plus Jakarta Sans dengan kontras warna pop-art yang tegas untuk memperkuat impresi visual.'
  }
]

/* ------------------------------- Logo Marquee Logos ------------------------------ */

export interface LogoMark {
  name: string
  color: string
  path: string
  badge?: string
}

export const logos: LogoMark[] = [
  { name: 'Kele Culinary', color: '#ffd200', path: 'M 14 10 A 10 10 0 0 1 14 30 Z', badge: 'F&B' },
  { name: 'Synergy Apparel', color: '#ff3366', path: 'M 10 10 L 30 10 L 20 30 Z', badge: 'Fashion' },
  { name: 'Galaxy Tech', color: '#00d2ff', path: 'M 20 10 L 30 20 L 20 30 L 10 20 Z', badge: 'SaaS' },
  { name: 'Retro FMCG', color: '#00cc99', path: 'M 10 15 H 30 V 25 H 10 Z', badge: 'Retail' },
  { name: 'Local Coffee Co', color: '#ff9900', path: 'M 15 10 A 8 8 0 0 1 25 10 L 25 25 H 15 Z', badge: 'UMKM' },
  { name: 'Urban Studio', color: '#9933ff', path: 'M 12 12 L 28 12 L 28 28 L 12 28 Z', badge: 'Brand' }
]

/* ------------------------------------ Pillars ----------------------------------- */

export interface Pillar {
  id: number
  icon: string
  title: string
  desc: string
  tag: string
  bg: string
  color: string
}

export const pillars: Pillar[] = [
  {
    id: 1,
    icon: '🎯',
    title: 'Visual Identity Upgrade',
    desc: 'Mentransformasi logo dan tampilan visual usaha lokal yang sederhana menjadi identitas brand yang profesional, konsisten, dan mudah diingat konsumen.',
    tag: 'Logo & Brand System',
    bg: 'rgba(var(--color-primary-rgb), 0.12)',
    color: 'var(--color-primary)'
  },
  {
    id: 2,
    icon: '📦',
    title: 'Packaging & Merchandise',
    desc: 'Mendesain kemasan produk retail, stiker kemasan, poster menu, dan merchandise cetak (kaos, mug) yang meningkatkan daya saing di pasaran.',
    tag: 'Print & Product Collateral',
    bg: 'rgba(var(--color-accent-rgb), 0.12)',
    color: 'var(--color-accent)'
  },
  {
    id: 3,
    icon: '🌐',
    title: 'Digital & Web Presence',
    desc: 'Menyusun materi feed sosial media promo dan antarmuka website sederhana yang menarik calon pembeli dan meningkatkan kepercayaan.',
    tag: 'Social Feed & Landing Page',
    bg: 'rgba(0, 204, 153, 0.12)',
    color: '#00cc99'
  }
]

/* ----------------------------------- Stickers ----------------------------------- */

export interface Sticker {
  id: number
  text: string
  x: number
  y: number
  zIndex: number
  bg: string
  color: string
  border?: string
  hasHalfMoon?: boolean
  isDragging?: boolean
}

export const stickers: Sticker[] = [
  { id: 1, text: 'kele design', x: 0, y: 0, zIndex: 1, bg: '#0066e2', color: '#ffffff', hasHalfMoon: true, border: '3px solid #ffffff' },
  { id: 2, text: '💡 Ideas & Impact', x: 0, y: 0, zIndex: 2, bg: '#ffd200', color: '#080d1a', border: '3px solid #ffffff' },
  { id: 3, text: '🎨 UI/UX', x: 0, y: 0, zIndex: 3, bg: '#ff3366', color: '#ffffff', border: '3px solid #ffffff' },
  { id: 4, text: 'CMYK', x: 0, y: 0, zIndex: 4, bg: '#ffffff', color: '#080d1a', border: '3px solid #0066e2' },
  { id: 5, text: '👋 Halo, Saya Bagus', x: 0, y: 0, zIndex: 5, bg: '#00cc99', color: '#ffffff', border: '3px solid #ffffff' },
  { id: 6, text: 'Plus Jakarta Sans', x: 0, y: 0, zIndex: 6, bg: 'rgba(8, 13, 26, 0.95)', color: '#ffd200', border: '1px solid rgba(255, 255, 255, 0.2)' }
]
