# Adhi.web.id — Landing Page (Single File)

Landing page satu file untuk **Adhi.web.id**, jasa pembuatan landing page website untuk UMKM, cafe, restoran, dan personal brand di Indonesia.

> Tagline: *"Setiap usaha punya tempatnya di semesta internet"*

---

## 1. Fitur yang Sudah Selesai

- ✅ **Satu file HTML** (`index.html`) — semua CSS & JS inline, tanpa library eksternal (kecuali Google Fonts).
- ✅ **Logo SVG inline** (lingkaran + bintang 4-titik gold + teks "adhi.web.id") di header & footer.
- ✅ **Header sticky** dengan backdrop blur, nav anchor (desktop) + hamburger menu slide-down (mobile <768px).
- ✅ **Hero** dengan badge, headline besar, sub-headline, 2 CTA, dan trust strip.
- ✅ **Portfolio** — 3 card live (Senja Cafe, Warung Makan, Bakso Mantab) dengan badge berwarna & ikon Tabler (SVG inline). Link buka tab baru.
- ✅ **Layanan** — 3 blok bergantian kiri-kanan dengan ikon palette / world / rocket.
- ✅ **Kenapa Adhi.web.id** — section beda background + grid 4 bullet.
- ✅ **Harga** — 3 kartu paket (Starter / Standard featured / Pro) + tabel perbandingan.
- ✅ **Proses Kerja** — 4 langkah dengan nomor besar + garis putus-putus penghubung.
- ✅ **Testimoni** — card placeholder dengan kutip besar & 5 bintang outline.
- ✅ **FAQ** — accordion JS (smooth max-height, ikon plus/minus, satu terbuka).
- ✅ **CTA penutup** — signature star gold (SVG + pulse) sebagai callback dari hero.
- ✅ **Footer** — logo, copyright, tagline.
- ✅ **Canvas rasi bintang** background: 100 bintang, garis penghubung, twinkle, parallax scroll 0.03x, bintang signature gold (hero + CTA), dim opacity 0.35 di section Harga & FAQ.
- ✅ **Scroll-reveal** via IntersectionObserver (threshold 0.12).
- ✅ **prefers-reduced-motion** — animasi canvas & reveal dimatikan, bintang tetap statis.
- ✅ **Responsif** — breakpoint 768px & 1024px.

## 2. Functional Entry / Path

| Path | Keterangan |
|------|------------|
| `index.html` | Halaman tunggal landing page |
| `#hero` `#portfolio` `#layanan` `#harga` `#faq` | Anchor smooth-scroll antar section |

Tombol WhatsApp mengarah ke:
`https://wa.me/62[NOMOR_WA]?text=Halo%20Adhi%2C%20saya%20mau%20konsultasi%20website`

## 3. Cara Mengganti Nomor WhatsApp

Cari & ganti placeholder `[NOMOR_WA]` di `index.html` (muncul di tautan WhatsApp header, mobile nav, kartu harga, dan CTA). Tulis hanya angka setelah `62`, contoh: `81234567890`.

## 4. Data Model / Storage

Tidak ada — situs sepenuhnya statis, tanpa backend/tabel.

## 5. Belum Diimplementasikan

- Testimoni masih placeholder (menunggu data klien nyata).
- Tidak ada form kontak (sengaja, alur lewat WhatsApp).

## 6. Rekomendasi Langkah Berikutnya

1. Ganti `[NOMOR_WA]` dengan nomor WhatsApp asli.
2. Tambahkan screenshot/thumbnail asli untuk card portfolio (saat ini placeholder ikon).
3. Isi testimoni klien nyata.
4. Tambahkan meta Open Graph / favicon untuk SEO & sharing.
5. Deploy melalui **Publish tab**.

## 7. Deploy

Untuk membuat website live, buka **Publish tab** dan publish dengan satu klik.
