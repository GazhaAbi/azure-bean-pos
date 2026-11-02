# Azure Bean Coffee - Delftware Edition POS & Table Management System

Aplikasi Web Point of Sales (POS) & Manajemen Denah Meja Kafe modern bertema keramik Delftware (*Delft Blue*). Dibangun murni menggunakan HTML5, Tailwind CSS, dan JavaScript tanpa dependensi server-side (berjalan penuh di sisi klien menggunakan LocalStorage dan disinkronkan secara real-time antar tab).

---

## 🌐 Tautan Akses Aplikasi Live (GitHub Pages)

Buka tautan resmi berikut di browser smartphone, tablet, atau komputer Anda:

| Fitur | Tautan Langsung (GitHub Pages) | Keterangan |
| :--- | :--- | :--- |
| 🪑 **Denah & Timer Meja Kafe** | [**Buka Denah Meja**](https://gazhaabi.github.io/azure-bean-pos/meja.html) | Denah visual kursi, timer 60 menit per meja, peringatan waktu & pembersihan meja |
| ☕ **Kasir POS Utama** | [**Buka Kasir POS**](https://gazhaabi.github.io/azure-bean-pos/index.html) | Katalog menu, keranjang transaksi, pembayaran tunai/QRIS, cetak struk |
| 📱 **Buku Menu Smartphone Tamu** | [**Buka Menu Tamu**](https://gazhaabi.github.io/azure-bean-pos/menu.html) | Tampilan mobile untuk tamu pesan mandiri (*Self-Order*) dari meja |
| 📋 **Antrean Pesanan & Dapur** | [**Buka Antrean**](https://gazhaabi.github.io/azure-bean-pos/antrean.html) | Monitor alur pesanan kasir, barista & dapur, konfirmasi pembayaran |
| 📦 **Katalog & Stok Menu** | [**Buka Katalog**](https://gazhaabi.github.io/azure-bean-pos/katalog.html) | Kelola harga, status ketersediaan (*In Stock / Out of Stock*), tambah produk |
| 📊 **Statistik & Laporan** | [**Buka Statistik**](https://gazhaabi.github.io/azure-bean-pos/statistik.html) | Ringkasan omset harian, PB1, rata-rata nota, grafik penjualan |

> [!IMPORTANT]
> **Catatan Penggunaan Link:**
> - Gunakan domain **`gazhaabi.github.io`** untuk menjalankan aplikasi web live.
> - Mengakses langsung file HTML melalui domain repository Git (`github.com/GazhaAbi/azure-bean-pos/meja.html`) akan menghasilkan **Error 404**, karena `github.com` adalah repositori kode sumber, bukan web hosting HTML.

---

## ✨ Fitur Unggulan

1. **Denah Visual Meja & Aturan Waktu Otomatis**:
   - Denah kursi visual intuitif (2 kursi, 4 kursi, VIP).
   - Timer santai 60 menit per meja dengan indikator visual:
     - 🔵 **Santai** (0–45 mnt): Biru tenang.
     - 🟡 **Peringatan** (45–60 mnt): Amber berdenyut (sisa &le; 15 mnt).
     - 🔴 **Waktu Habis** (>60 mnt): Otomatis berubah status menjadi *Perlu Dibersihkan 🧹*.
   - Tombol perpanjangan waktu `[ +30m ]` untuk tamu yang memesan lagi.

2. **Pemesanan Mandiri Tamu (Self-Ordering)**:
   - Pelanggan dapat memesan langsung dari smartphone mereka di `menu.html`.
   - Transparansi timer sisa waktu santai tampil sopan di layar tamu.
   - Pesanan otomatis masuk ke antrean kasir dan barista secara real-time.

3. **Desain Azure Bean Bersih & Elegan**:
   - Nuansa warna biru kobalt (*Cobalt Blue*) dan abu-abu lembut yang bersih, rapi, dan nyaman di mata staf maupun pelanggan.
   - Tata letak responsif untuk komputer kasir POS, tablet, dan smartphone.
