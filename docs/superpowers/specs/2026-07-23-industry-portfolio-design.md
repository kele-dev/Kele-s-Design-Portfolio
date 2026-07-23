# Spesifikasi Desain: Portofolio Multi-Industri & Visual Suite (kele design)

**Tanggal**: 2026-07-23  
**Status**: Disetujui Pengguna (Drafting Spec)  
**Tujuan**: Mengorganisir dan menyajikan karya desain yang non-end-to-end (seperti Instagram post feed, poster menu, display banner) ke dalam kategori industri agar terlihat serbaguna (*versatile*), profesional, dan berbobot khas portofolio agensi.

---

## 1. Arsitektur Komponen & Kategori Industri

Sistem penyaringan (*filtering*) pada `PortfolioGrid.vue` akan dikategorikan berdasarkan sektor industri untuk memamerkan keahlian lintas bidang:

- `All`: Menampilkan seluruh koleksi karya industri.
- `F&B / Culinary`: Khusus desain tempat makan, kafe, restoran, menu, dan feed kuliner.
- `Fashion & Lifestyle`: Khusus desain produk apparel, kecantikan, dan gaya hidup.
- `Corporate & Tech`: Khusus desain aplikasi digital, layanan teknologi, dan branding korporat.
- `Retail & FMCG`: Khusus desain barang konsumen, kemasan (*packaging*), dan media cetak promosi.

---

## 2. Struktur Kartu Proyek (*Visual Suite Card*)

Setiap item proyek tidak disajikan sebagai gambar tunggal biasa, melainkan dikemas sebagai **Visual Suite**:

### Tampilan Kartu Grid
- **Badging**: Menampilkan badge industri yang jelas (misal: `F&B / CULINARY`).
- **Judul Proyek**: Nama koleksi desain (misal: `Artisan Culinary & Menu Suite`).
- **Tag Sub-Format**: Menyebutkan jenis materi yang dibuat (misal: `Social Media Feed • Menu Poster • POS Display`).
- **Efek Hover**: Image zoom halus dengan overlay tombol "Lihat Visual Suite".

### Tampilan Modal Case Study
- **Multi-Media Viewer**: Galeri gambar interaktif yang menampilkan variasi *post feed*, *poster menu*, dan *banner display*.
- **Informasi Metadata**: Klien / Sektor, Tahun, dan Peran Desain.
- **Narasi Pendek**: Penjelasan tantangan komunikasi visual khusus industri tersebut dan solusi layout/hirarki warna yang diterapkan.

---

## 3. Rincian Data Proyek (*Mock Datasets*)

1. **F&B Visual Suite** (`F&B / Culinary`):
   - Format: Instagram Grid Feed + Poster Menu Kafe + POS Table Banner.
   - Fokus: Tipografi menu legibel, psikologi warna selera makan, penataan foto hidangan utama.
2. **Fashion & Lookbook Suite** (`Fashion & Lifestyle`):
   - Format: Instagram Lookbook Series + Poster Event Launch.
   - Fokus: Layout minimalis modern, kontras tipografi tinggi, komposisi foto busana.
3. **Tech & App Campaign Suite** (`Corporate & Tech`):
   - Format: Promotional Social Media Feed + App Feature Highlight Display.
   - Fokus: Visualisasi fitur aplikasi, warna bertema gelap pekat (*dark UI theme*), serta ikonografi bersih.
4. **Retail & FMCG Graphic Suite** (`Retail & FMCG`):
   - Format: Product Showcase Banner + Promotional Packaging Graphic.
   - Fokus: Daya tarik produk retail di rak / media sosial, pop-art color palette.

---

## 4. Verifikasi & Self-Review Spec

- [x] **Placeholder scan**: Tidak ada TBD/TODO yang menggantung. Semua struktur data dan industri telah terdefinisi dengan jelas.
- [x] **Internal consistency**: Menggunakan komponen Vue 3 yang sudah ada (`PortfolioGrid.vue`, `style.css`) tanpa merusak fitur custom cursor maupun draggable stickers.
- [x] **Scope check**: Ruang lingkup terisolasi pada perombakan struktur data dan tampilan `PortfolioGrid.vue`.
- [x] **Ambiguity check**: Pemisahan tegas antara kategori industri dan format media melalui tag badge.
