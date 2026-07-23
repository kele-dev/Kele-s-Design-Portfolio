# Spesifikasi Desain: Portofolio Full-Spectrum, Animated Logo Ticker & UMKM Impact (kele design)

**Tanggal**: 2026-07-23  
**Status**: Disetujui Pengguna (Final Spec)  
**Tujuan**: Mengintegrasikan keahlian branding lengkap (Logo ➔ Merchandise), Desain Website, animasi logo interaktif, serta section dampak UMKM ke dalam portofolio kele design.

---

## 1. Komponen Pita Logo Bergerak (*Animated Logo Marquee*)

- **Nama Komponen**: `src/components/LogoMarquee.vue`
- **Posisi**: Terletak tepat di antara Hero Section dan Portfolio Section.
- **Visual**: Marquee pita horizontal berulang tanpa henti (*infinite loop animation*).
- **Interaktivitas**: Menampilkan jajaran logo brand & UMKM. Saat logo di-hover, logo akan berputar atau memantul (*spring motion effect*).

---

## 2. Pembaruan Kategori Filter & Badging Portofolio (`PortfolioGrid.vue`)

### Kategori Filter Baru
- `All`
- `Full Brand Systems` *(Koleksi lengkap dari Logo, Guidelines, hingga Merchandise)*
- `F&B & Retail` *(Kuliner & Toko Fisik)*
- `Web & Digital` *(Desain Website, UI/UX, & Landing Pages)*
- `Fashion & Corporate`

### Badging Penanda Spesial
- `⭐ Full Identity`: Untuk karya branding lengkap dari logo hingga merch.
- `🌐 Web Design`: Untuk karya antarmuka website & digital.
- `🌱 UMKM Partner`: Untuk karya pendampingan usaha lokal / UMKM.

---

## 3. Komponen Dampak UMKM (`src/components/UmkmImpact.vue`)

- **Nama Komponen**: `src/components/UmkmImpact.vue`
- **Posisi**: Terletak di atas section Contact.
- **Tujuan**: Menjelaskan nilai tambah pendampingan desain untuk usaha lokal (UMKM).
- **Pilar Nilai Tambah**:
  1. 🎯 **Visual Upgrade**: Mentransformasi identitas visual UMKM menjadi sekelas brand nasional/global.
  2. 📦 **Packaging & Merchandise**: Desain kemasan, stiker, kaos, dan media cetak yang meningkatkan daya saing.
  3. 🌐 **Digital & Web Presence**: Antarmuka media sosial dan landing page yang menarik minat calon pembeli.

---

## 4. Multi-Slide Case Study Modal & Logo Motion

- **Motion Logo**: Logo pada kartu grid & modal akan memiliki efek animasi *hover-motion*.
- **Navigasi Multi-Slide Modal**: Modal detail proyek mendukung navigasi 3 slide:
  - Slide 1: Logo Concept & Color System
  - Slide 2: Packaging & Merchandise Mockups (T-shirt, Mug, Tote Bag, Stickers)
  - Slide 3: Web UI & Digital Presence Preview

---

## 5. Self-Review Spec

- [x] **Placeholder scan**: Seluruh komponen, kategori, dan fungsionalitas terdefinisi lengkap.
- [x] **Internal consistency**: Terintegrasi bersih dengan Vue 3, `@vueuse/motion`, dan sistem vanilla CSS `style.css`.
- [x] **Scope check**: Terstruktur secara modular ke dalam komponen `LogoMarquee.vue`, `UmkmImpact.vue`, dan pembaruan `PortfolioGrid.vue`.
- [x] **Ambiguity check**: Pemisahan tegas antara filter industri, badge tipe proyek, dan section dampak UMKM.
