<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peminjaman;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validasi
        $validator = Validator::make($request->all(), [
            'fasilitas_id' => 'required',
            'kategori' => 'required|in:Umum,Organisasi,Kampus',
            'tanggal_reservasi' => 'required|date',
            'waktu_mulai' => 'required',
            'keperluan_peminjaman' => 'required|string',
            'peralatan_tambahan' => 'nullable|string',
            
            // File Wajib untuk SEMUA
            'file_ktp' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'file_surat_permohonan' => 'required|file|mimes:pdf|max:2048',
            
            // File Pengantar: WAJIB untuk Organisasi/Kampus, TIDAK PERLU untuk Umum
            'file_surat_pengantar' => 'required_if:kategori,Organisasi,Kampus|file|mimes:pdf|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2. Upload File
        $pathKtp = $request->file('file_ktp')->store('dokumen/ktp', 'public');
        $pathPermohonan = $request->file('file_surat_permohonan')->store('dokumen/permohonan', 'public');
        
        // Upload Surat Pengantar HANYA JIKA ada filenya (Kategori bukan Umum)
        $pathPengantar = null;
        if ($request->hasFile('file_surat_pengantar')) {
            $pathPengantar = $request->file('file_surat_pengantar')->store('dokumen/pengantar', 'public');
        }

        // 3. Mapping Fasilitas ID
        $fasilitasId = $request->fasilitas_id;
        if (!is_numeric($fasilitasId)) {
            $fasilitasId = (strtoupper($fasilitasId) == 'AULA') ? 1 : 2; 
        }

        // 4. Simpan ke Database
        $peminjaman = Peminjaman::create([
            'user_id' => $request->user()->id,
            'fasilitas_id' => $fasilitasId,
            'kategori' => $request->kategori,
            'tanggal_reservasi' => $request->tanggal_reservasi,
            'waktu_mulai' => $request->waktu_mulai,
            'keperluan_peminjaman' => $request->keperluan_peminjaman,
            'peralatan_tambahan' => $request->peralatan_tambahan,
            
            'file_ktp' => $pathKtp,
            'file_surat_permohonan' => $pathPermohonan,
            'file_surat_pengantar' => $pathPengantar, // Akan NULL jika Umum
            
            'status_peminjaman' => 'Diajukan', 
        ]);

        return response()->json([
            'message' => 'Pengajuan berhasil dikirim!',
            'data' => $peminjaman
        ], 201);
    }

    // Method history() tetap sama seperti sebelumnya...
    public function history(Request $request)
    {
        // 1. Ambil data milik user yang login
        $riwayat = Peminjaman::where('user_id', $request->user()->id)
                            ->with('fasilitas') // Ambil nama fasilitas juga
                            ->latest() // Urutkan dari yang terbaru
                            ->get();

        // 2. Format data agar rapi saat dikirim ke React
        $formatted = $riwayat->map(function($item) {
            return [
                'id' => $item->id,
                'facility' => $item->fasilitas->nama_fasilitas ?? 'Fasilitas Umum',
                'date' => $item->tanggal_reservasi, // Format: 2026-01-20
                'time' => $item->waktu_mulai,      // Format: 08:00 - 10:00
                'status' => $item->status_peminjaman, // Diajukan/Disetujui/Ditolak
                'purpose' => $item->keperluan_peminjaman,
                'type' => $item->kategori,
            ];
        });

        // 3. Kirim sebagai JSON
        return response()->json($formatted);
    }

    public function riwayatSaya(Request $request)
    {
        // 1. Ambil User ID dari Token yang sedang login
        $userId = Auth::id();

        // 2. Cari Peminjaman MILIK USER TERSEBUT SAJA
        $history = Peminjaman::with('fasilitas') // Load relasi fasilitas
                    ->where('user_id', $userId)  // <--- FILTER PENTING
                    ->orderBy('created_at', 'desc')
                    ->get();

        // 3. Format Data agar sesuai dengan Frontend React
        $formatted = $history->map(function($item) {
            return [
                'id' => $item->id,
                'facility' => $item->fasilitas->nama_fasilitas ?? 'Fasilitas Umum',
                'date' => $item->tanggal_reservasi,
                'time' => $item->waktu_mulai,
                'status' => $this->mapStatus($item->status_peminjaman),
                // Tambahan jika perlu ditampilkan di detail
                'purpose' => $item->keperluan_peminjaman,
            ];
        });

        return response()->json($formatted);
    }

    public function getBookedDates(Request $request)
    {
        $facilityName = $request->query('facility'); // Menerima 'AULA' atau 'LAPANGAN'

        // Mapping nama frontend ke ID database (Sesuaikan dengan ID di tabel fasilitas Anda)
        // Asumsi: 1 = Aula, 2 = Lapangan
        $facilityId = ($facilityName === 'LAPANGAN') ? 2 : 1; 

        $dates = Peminjaman::where('fasilitas_id', $facilityId)
                    ->whereIn('status_peminjaman', ['Diajukan', 'Menunggu Konfirmasi', 'Disetujui']) // Status yang bikin merah
                    ->pluck('tanggal_reservasi'); // Hanya ambil kolom tanggal

        return response()->json($dates);
    }

    private function mapStatus($dbStatus) {
        if ($dbStatus == 'Diajukan') return 'Menunggu Konfirmasi';
        return $dbStatus; // Disetujui / Ditolak / Dibatalkan
    }
}