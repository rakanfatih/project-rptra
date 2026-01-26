# Dokumentasi Teknis Backend - Aplikasi Peminjaman RPTRA Lenteng Agung

**Dibuat oleh:** Backend Developer Team
**Versi:** 1.0
**Status:** Development (Selesai Fitur Utama)

---

## 1. Identitas Proyek & Teknologi
Dokumen ini berisi rincian teknis pengembangan backend untuk sistem peminjaman fasilitas RPTRA.

- **Framework:** Laravel 10 / 11
- **Bahasa:** PHP (Versi Min 8.1)
- **Database:** MySQL
- **Web Server:** Apache (via XAMPP)
- **Arsitektur:** MVC (Model-View-Controller)

---

## 2. Panduan Instalasi (Setup)
Cara menjalankan proyek ini di komputer lokal (Localhost):

1.  **Persiapan Folder:**
    Pastikan berada di dalam folder proyek melalui terminal.
    ```bash
    cd rptra-lenteng-agung
    ```

2.  **Install Dependencies:**
    Mengunduh semua pustaka Laravel yang dibutuhkan.
    ```bash
    composer install
    ```

3.  **Konfigurasi Environment (.env):**
    Salin file `.env.example` menjadi `.env`, lalu atur koneksi database:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=db_rptra_lenteng
    DB_USERNAME=root
    DB_PASSWORD=
    ```

4.  **Setup Sistem:**
    Generate kunci keamanan dan link penyimpanan file upload.
    ```bash
    php artisan key:generate
    php artisan storage:link
    ```

5.  **Database & Seeding:**
    Membuat tabel dan mengisi data awal (Fasilitas Aula & Lapangan).
    ```bash
    php artisan migrate
    php artisan db:seed --class=FasilitasSeeder
    ```

6.  **Jalankan Server:**
    ```bash
    php artisan serve
    ```
    Akses aplikasi di: `http://127.0.0.1:8000`

---

## 3. Skema Database (Schema)

Berikut adalah struktur tabel yang digunakan dalam aplikasi:

### A. Tabel: `users`
Menyimpan data akun pengguna (Warga dan Admin).
| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BigInt (PK) | ID Unik |
| `nama_depan` | String | |
| `nama_belakang` | String | |
| `email` | String | Unique (untuk login) |
| `password` | String | Hash (Terenkripsi) |
| `role` | Enum | Pilihan: `'Warga'`, `'Admin'` |

### B. Tabel: `fasilitas`
Menyimpan data master fasilitas RPTRA.
| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BigInt (PK) | ID Unik |
| `nama_fasilitas`| String | Contoh: "Aula", "Lapangan" |
| `deskripsi` | Text | Penjelasan singkat fasilitas |

### C. Tabel: `peminjaman`
Menyimpan transaksi pengajuan reservasi.
| Kolom | Tipe Data | Keterangan |
| :--- | :--- | :--- |
| `id` | BigInt (PK) | ID Unik |
| `user_id` | Foreign Key | Relasi ke tabel `users` |
| `fasilitas_id` | Foreign Key | Relasi ke tabel `fasilitas` |
| `kategori` | Enum | `'Umum'`, `'Organisasi'`, `'Kampus'` |
| `tanggal_reservasi`| Date | Tanggal pemakaian |
| `waktu_mulai` | Time | Jam mulai acara |
| `keperluan` | Text | Detail acara |
| `file_syarat` | String | Path lokasi file (gambar/pdf) |
| `status` | Enum | `'Diajukan'`, `'Disetujui'`, `'Ditolak'` |

---

## 4. Logika Bisnis & Controllers

### A. AuthController (Autentikasi)
Menangani keamanan akses masuk aplikasi.
- **Register:** User baru yang mendaftar otomatis mendapatkan role **'Warga'**.
- **Login:**
  - Jika `role == 'Admin'` -> Redirect ke Dashboard Admin.
  - Jika `role == 'Warga'` -> Redirect ke Halaman Utama.
- **Middleware:** Menggunakan `auth` (wajib login) dan `is_admin` (khusus admin).

### B. BookingController (Fitur Warga)
Menangani proses peminjaman oleh warga.
- **Formulir (`create`):** Menampilkan opsi fasilitas dari database.
- **Simpan (`store`):**
  - Validasi: Tanggal harus masa depan, file max 2MB.
  - Upload: File disimpan di folder `storage/app/public/dokumen_syarat`.
  - Status Awal: Default tersimpan sebagai **'Diajukan'**.
- **Riwayat (`history`):** Menampilkan daftar peminjaman hanya milik user yang sedang login.

### C. AdminController (Fitur Admin)
Menangani pengelolaan data reservasi.
- **Dashboard (`index`):** Menampilkan semua pengajuan masuk (terbaru paling atas).
- **Approval (`approve`):** Mengubah status peminjaman menjadi **'Disetujui'**.
- **Rejection (`reject`):** Mengubah status peminjaman menjadi **'Ditolak'**.

---

## 5. Daftar Route (Endpoint)

| URL | Method | Role | Fungsi |
| :--- | :--- | :--- | :--- |
| `/` | GET | Public | Halaman Utama (Landing Page) |
| `/login` | GET/POST | Public | Halaman & Proses Login |
| `/register` | GET/POST | Public | Halaman & Proses Daftar |
| `/ajukan-peminjaman`| GET/POST | Warga | Form & Submit Booking |
| `/riwayat-saya` | GET | Warga | Melihat status pengajuan |
| `/admin/dashboard` | GET | Admin | Melihat tabel rekapitulasi |
| `/admin/approve/{id}`| PATCH | Admin | Setujui Peminjaman |
| `/admin/reject/{id}` | PATCH | Admin | Tolak Peminjaman |

---

## 6. Catatan Pengujian (Testing)
Karena fitur register otomatis membuat akun 'Warga', untuk membuat akun 'Admin':
1.  Daftar akun baru via `/register`.
2.  Buka Database (phpMyAdmin).
3.  Edit tabel `users`, ubah kolom `role` user tersebut menjadi `'Admin'`.
4.  Login ulang untuk mengakses fitur Admin.