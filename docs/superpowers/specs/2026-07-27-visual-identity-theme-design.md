# Spesifikasi Desain: Dual-Theme Studio & Visual Identity Aesthetic (Kele's Design Portfolio)

**Tanggal**: 2026-07-27  
**Status**: Disetujui Pengguna  
**Inspirasi Utama**: [visualidentity.studio](https://visualidentity.studio/)

---

## 1. Ringkasan Tujuan

Mentransformasi estetika visual website **Kele's Design Portfolio** agar mengadopsi gaya kelas dunia ala **Visual Identity Studio**, dengan fitur **Dual-Theme Switcher (Light Studio & Dark Glass)**.

Perubahan ini mencakup:
1. **Sistem Tema Dinamis**: Light Studio Mode (`#EBEBEB` porcelain) & Dark Glass Mode (`#0A0A0C` obsidian).
2. **Floating Glassmorphic Header Navigation**: Navigasi melayang berbentuk kapsul (*rounded pill bar*) dengan blur efek, toggle tema, logo animasi, dan tombol CTA.
3. **Fixed Vertical Side Badge**: Badge vertikal melayang di tepi kiri layar (*"KELE DESIGN STUDIO • VISUAL IDENTITY"*).
4. **Preloader Studio**: Animasi pemuat awal (*preloader*) dengan spinning Kele logo mark.
5. **Karakter Tipografi & Card Grid Studio**: Tipografi `Inter` / `Inter Tight` berarsitektur editorial, sudut kartu *extra rounded* (`24px`), border frosted glass halus, serta layout statistik ber-impact tinggi.

---

## 2. Arsitektur Tema & Design Tokens (`src/style.css`)

Penerapan tema menggunakan atribut `data-theme="light"` atau `data-theme="dark"` pada elemen `<html>` dengan CSS custom variables:

### Light Studio Mode (Visual Identity Signature)
- `--bg-primary`: `#EBEBEB`
- `--bg-secondary`: `#F5F5F7`
- `--bg-card`: `rgba(255, 255, 255, 0.75)`
- `--bg-glass`: `rgba(235, 235, 235, 0.75)`
- `--text-primary`: `#0F0F0F`
- `--text-secondary`: `#555555`
- `--text-muted`: `#888888`
- `--border-subtle`: `rgba(0, 0, 0, 0.08)`
- `--border-glass`: `rgba(0, 0, 0, 0.12)`
- `--pill-cta-bg`: `#0F0F0F`
- `--pill-cta-text`: `#FFFFFF`
- `--glass-blur`: `blur(16px)`

### Dark Glass Mode (Dark Studio Signature)
- `--bg-primary`: `#0A0A0C`
- `--bg-secondary`: `#121216`
- `--bg-card`: `rgba(20, 20, 25, 0.65)`
- `--bg-glass`: `rgba(10, 10, 12, 0.75)`
- `--text-primary`: `#F3F4F6`
- `--text-secondary`: `#9CA3AF`
- `--text-muted`: `#6B7280`
- `--border-subtle`: `rgba(255, 255, 255, 0.1)`
- `--border-glass`: `rgba(255, 255, 255, 0.15)`
- `--pill-cta-bg`: `#FFFFFF`
- `--pill-cta-text`: `#0A0A0C`
- `--glass-blur`: `blur(16px)`

---

## 3. Spesifikasi Komponen UI

### A. Studio Preloader (`src/components/StudioPreloader.vue`)
- Komponen pemuat awal yang menutupi viewport dengan background bertema (`var(--bg-primary)`).
- Menampilkan logo geometris Kele yang berputar halus.
- Otomatis hilang (*fade out*) setelah 0.6 detik atau saat `DOMContentLoaded` selesai.

### B. Floating Glass Header (`src/App.vue` / Navbar)
- Container melayang di bagian atas (`position: fixed; top: 1.25rem; z-index: 100`).
- Efek `backdrop-filter: var(--glass-blur); background: var(--bg-glass); border: 1px solid var(--border-glass)`.
- Menggunakan `border-radius: 9999px` (pill shape).
- **Elemen Kiri**: Logo Kele + status ketersediaan (*"Available for work"*).
- **Elemen Tengah**: Navigasi (`About`, `Services`, `Projects`, `Impact`, `Contact`).
- **Elemen Kanan**: 
  - Toggle Switcher Tema (Ikon Matahari / Bulan).
  - Tombol CTA Pill (*"Get Proposal"* / *"Book Meeting"*).

### C. Fixed Vertical Side Badge (`src/components/SideBadge.vue`)
- Terpasang melayang di tepi kiri (`position: fixed; left: 0; top: 50%; transform: translateY(-50%)`).
- Tampilan pita hitam/gelap vertikal dengan teks putih presisi: `KELE DESIGN STUDIO • VISUAL IDENTITY 2026`.
- Sifat responsif: tersembunyi secara halus pada layar seluler (< 768px).

### D. Redesign Kartu Portofolio (`PortfolioGrid.vue`)
- `border-radius: 24px`.
- Layout grid responsif dengan spacing studio.
- Efek hover *image scale* (`scale(1.04)`) dengan filter pencahayaan halus.
- Tag industri & format media bergaya minimalis (`Inter Tight`, huruf kapital bersih).
- Overlay tombol pill *"Lihat Visual Suite"*.

### E. Penyesuaian Komponen Pendukung
- **InteractiveStickers.vue**: Warna stiker dan border otomatis menyesuaikan agar tetap terbaca dan estetis di kedua mode.
- **CustomCursor.vue**: Warna kursor melingkar berganti kontras mengikuti tema aktif.

---

## 4. Self-Review Spesifikasi

- [x] **Placeholder Scan**: Tidak ada TBD/TODO yang menggantung. Seluruh design tokens dan komponen telah dijabarkan secara mendalam.
- [x] **Konsistensi Internal**: Variabel CSS bertindak sebagai single source of truth untuk tema Light Studio dan Dark Glass.
- [x] **Scope Check**: Terfokus pada sistem tema, navigasi floating glass, side badge, preloader, dan pembaruan visual komponen.
- [x] **Ambiguity Check**: Status default tema diatur ke `light` untuk langsung merefleksikan estetika `visualidentity.studio`, dengan toggle yang tersimpan di `localStorage`.
