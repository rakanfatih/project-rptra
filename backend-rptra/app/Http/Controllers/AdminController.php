<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peminjaman;

class AdminController extends Controller
{
    // MENAMPILKAN SEMUA DATA
    public function index()
    {
        $bookings = Peminjaman::with(['user', 'fasilitas'])
                    ->latest() // Urutkan dari yang terbaru
                    ->get();

        // Format data agar sesuai dengan Frontend React
        $formatted = $bookings->map(function($item) {
            return [
                'id' => $item->id,
                
                // === PENTING: KIRIM OBJECT USER LENGKAP ===
                // Ini agar frontend bisa akses booking.user.no_telepon, booking.user.email, dll
                'user' => $item->user, 
                
                // Data mapping manual (untuk backward compatibility frontend lama)
                'name' => $item->user->nama_depan . ' ' . $item->user->nama_belakang,
                'email' => $item->user->email,
                'no_telepon' => $item->user->no_telepon, // Tambahan eksplisit (opsional jika 'user' sudah ada)
                'avatar' => $item->user->avatar, 
                
                'facility' => $item->fasilitas->nama_fasilitas ?? 'Fasilitas Umum',
                'date' => $item->tanggal_reservasi,
                'time' => $item->waktu_mulai,
                'status' => $this->mapStatus($item->status_peminjaman),
                'type' => $item->kategori,
                'purpose' => $item->keperluan_peminjaman,
                'equipment' => $item->peralatan_tambahan,
                
                // File Dokumen
                'file_ktp' => $item->file_ktp,
                'file_surat_permohonan' => $item->file_surat_permohonan,
                'file_surat_pengantar' => $item->file_surat_pengantar,
            ];
        });

        return response()->json($formatted);
    }

    // ACTION: APPROVE (SETUJUI)
    public function approve($id)
    {
        $booking = Peminjaman::find($id);
        
        if (!$booking) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $booking->status_peminjaman = 'Disetujui'; 
        $booking->save();

        return response()->json(['message' => 'Status berhasil diubah menjadi Disetujui']);
    }

    // ACTION: REJECT (TOLAK)
    public function reject($id)
    {
        $booking = Peminjaman::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $booking->status_peminjaman = 'Ditolak';
        $booking->save();

        return response()->json(['message' => 'Status berhasil diubah menjadi Ditolak']);
    }

    // Helper: Mapping Status DB ke Tampilan
    private function mapStatus($dbStatus) {
        if ($dbStatus == 'Diajukan') return 'Menunggu Konfirmasi';
        if ($dbStatus == 'Disetujui') return 'Disetujui';
        if ($dbStatus == 'Ditolak') return 'Ditolak';
        return $dbStatus;
    }
}