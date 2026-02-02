<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peminjaman;

class AdminController extends Controller
{
    public function index()
    {
        $bookings = Peminjaman::with(['user', 'fasilitas'])
                    ->latest()
                    ->get();

        $formatted = $bookings->map(function($item) {
            return [
                'id' => $item->id,
                'user' => $item->user, 
                'name' => $item->user->nama_depan . ' ' . $item->user->nama_belakang,
                'email' => $item->user->email,
                'no_telepon' => $item->user->no_telepon, 
                'avatar' => $item->user->avatar, 
                'facility' => $item->fasilitas->nama_fasilitas ?? 'Fasilitas Umum',
                'date' => $item->tanggal_reservasi,
                'time' => $item->waktu_mulai,
                'status' => $this->mapStatus($item->status_peminjaman),
                'type' => $item->kategori,
                'purpose' => $item->keperluan_peminjaman,
                'equipment' => $item->peralatan_tambahan,
                'file_ktp' => $item->file_ktp,
                'file_surat_permohonan' => $item->file_surat_permohonan,
                'file_surat_pengantar' => $item->file_surat_pengantar,
            ];
        });

        return response()->json($formatted);
    }

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

    private function mapStatus($dbStatus) {
        if ($dbStatus == 'Diajukan') return 'Menunggu Konfirmasi';
        if ($dbStatus == 'Disetujui') return 'Disetujui';
        if ($dbStatus == 'Ditolak') return 'Ditolak';
        return $dbStatus;
    }
}