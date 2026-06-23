# Adhi.id — Landing Page

Landing page satu halaman untuk **Adhi.id**, jasa pembuatan website + domain + hosting + SEO dasar untuk UMKM, cafe, dan personal brand di Indonesia.

Tema visual: **dark professional, gaya startup teknologi**, dengan motif **rasi bintang (constellation)** yang menjadi metafora *"setiap usaha adalah bintang yang punya tempatnya sendiri di semesta internet"*.

---

## 🎯 Tujuan & Konsep
- Meyakinkan pemilik usaha kecil bahwa mereka pantas punya "rumah sendiri" di internet.
- Menonjolkan keunggulan: dikerjakan langsung (tanpa perantara), harga transparan, garansi revisi.
- Mengubah pengunjung menjadi lead via tombol **Chat WhatsApp**.

---

## ✨ Fitur yang Sudah Selesai

### Desain & Visual
- Background **charcoal/near-black** (bukan pure black), tidak polos.
- **Motif rasi bintang** sebagai layer `<canvas>` terpisah (z-index rendah):
  - Titik bintang kecil + garis penghubung tipis antar titik.
  - Animasi *twinkle* halus + *parallax* lembut saat scroll.
  - Opacity & density rendah agar tidak mengganggu keterbacaan teks.
- **Bintang signature gold/amber** berkedip di area hero → muncul kembali di section CTA penutup sebagai *callback visual* (konsisten).
- Aksen **gold/amber** dipakai terbatas (CTA, garis aktif, teks penting, titik bintang).
- Tipografi: `Space Grotesk` (display), `Inter` (body), `JetBrains Mono` (angka/harga).
- Hairline pembatas antar section, hover effect halus, scroll-reveal animation ringan.

### Struktur Halaman (sesuai brief)
1. **Header** — logo, nav (Layanan/Portfolio/Harga/FAQ), CTA WhatsApp + menu mobile.
2. **Hero** — badge, headline besar, sub-headline, 2 CTA, strip 3 trust point, bintang signature.
3. **Apa yang kamu dapatkan** — 3 blok checklist bergantian (Desain Website, Domain & Hosting, SEO Dasar).
4. **Kenapa Adhi.id** — paragraf authority + 4 bullet kepercayaan.
5. **Portfolio** — 3 card demo (Cafe, UMKM, Personal Brand).
6. **Harga** — 3 kartu paket (Starter / Standard "Paling Populer" / Premium) + **tabel komparasi lengkap**.
7. **Proses kerja** — 4 langkah (Konsultasi → Desain → Revisi → Live).
8. **Testimoni** — 3 placeholder klien.
9. **FAQ** — accordion 4 pertanyaan.
10. **CTA penutup** — headline + tombol WhatsApp besar + bintang signature (callback).
11. **Footer** — logo, tagline, copyright.

### Teknis
- **Responsif penuh** sampai mobile (breakpoint 900px & 560px), termasuk menu hamburger.
- **Performa**: density bintang dibatasi & dikurangi di layar kecil, garis penghubung dilewati di layar sangat kecil, animasi pause saat tab tidak aktif.
- **Aksesibilitas**: menghormati `prefers-reduced-motion` (animasi dimatikan, frame statis digambar), ARIA label, struktur heading semantik, canvas `aria-hidden`.

---

## 📁 Struktur Proyek
```
index.html        # Seluruh markup landing page
css/
  └── style.css   # Tema dark, layout, komponen, responsive, reduced-motion
js/
  └── main.js     # Constellation canvas, reveal, sticky header, mobile nav
README.md
```

---

## 🔗 Functional Entry Points (paths & parameter)
| Path | Keterangan |
|------|------------|
| `index.html` (`/`) | Halaman utama (satu-satunya halaman) |
| `#hero`, `#layanan`, `#kenapa`, `#portfolio`, `#harga`, `#proses`, `#testimoni`, `#faq`, `#cta` | Anchor navigasi antar-section |
| `https://wa.me/6281234567890?text=...` | Link WhatsApp (CTA) — **placeholder, wajib diganti** |

> Tidak ada API/tabel data — situs ini murni statis (frontend only).

---

## 📝 Placeholder yang HARUS Diganti
- **Nomor WhatsApp**: `6281234567890` muncul di beberapa tombol (header, harga, CTA). Cari & ganti semuanya.
- **Harga**: `Rp1.500.000`, `Rp3.000.000`, `Rp5.000.000` di section Harga & detail tabel komparasi.
- **Portfolio**: link `href="#"` pada tombol "Lihat demo" → ganti dengan URL demo asli + thumbnail nyata.
- **Testimoni**: teks placeholder + nama/usaha/kota klien.

---

## 🚧 Belum Diimplementasikan / Saran Pengembangan
- Galeri portfolio nyata (gambar/screenshot project asli).
- Halaman detail per paket atau form lead (jika ingin selain WhatsApp).
- Integrasi analytics (Google Analytics / Search Console) untuk tracking konversi.
- Favicon & meta Open Graph (preview share sosial media).
- Multi-bahasa bila menyasar klien internasional.

---

## 🚀 Deploy
Untuk mempublikasikan website dan membuatnya live, silakan buka **tab Publish** — proses deployment ditangani otomatis dan kamu akan mendapat URL live-nya.
