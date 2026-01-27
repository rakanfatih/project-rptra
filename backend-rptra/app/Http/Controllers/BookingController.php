<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peminjaman;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fasilitas_id' => 'required',
            'kategori' => 'required|in:Umum,Organisasi,Kampus',
            'tanggal_reservasi' => 'required|date',
            'waktu_mulai' => 'required',
            'keperluan_peminjaman' => 'required|string',
            'peralatan_tambahan' => 'nullable|string',
            'file_ktp' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'file_surat_permohonan' => 'required|file|mimes:pdf|max:2048',
            'file_surat_pengantar' => 'required_if:kategori,Organisasi,Kampus|file|mimes:pdf|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $pathKtp = $request->file('file_ktp')->store('dokumen/ktp', 'public');
        $pathPermohonan = $request->file('file_surat_permohonan')->store('dokumen/permohonan', 'public');
        $pathPengantar = null;
        if ($request->hasFile('file_surat_pengantar')) {
            $pathPengantar = $request->file('file_surat_pengantar')->store('dokumen/pengantar', 'public');
        }

        $fasilitasId = $request->fasilitas_id;
        if (!is_numeric($fasilitasId)) {
            $fasilitasId = (strtoupper($fasilitasId) == 'AULA') ? 1 : 2; 
        }

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
            'file_surat_pengantar' => $pathPengantar, 
            'status_peminjaman' => 'Diajukan', 
        ]);

        return response()->json([
            'message' => 'Pengajuan berhasil dikirim!',
            'data' => $peminjaman
        ], 201);
    }

    public function history(Request $request)
    {
        $riwayat = Peminjaman::where('user_id', $request->user()->id)
                            ->with('fasilitas') 
                            ->latest() 
                            ->get();

        $formatted = $riwayat->map(function($item) {
            return [
                'id' => $item->id,
                'facility' => $item->fasilitas->nama_fasilitas ?? 'Fasilitas Umum',
                'date' => $item->tanggal_reservasi, 
                'time' => $item->waktu_mulai,      
                'status' => $item->status_peminjaman, 
                'purpose' => $item->keperluan_peminjaman,
                'type' => $item->kategori,
            ];
        });

        return response()->json($formatted);
    }

    public function riwayatSaya(Request $request)
    {
        $userId = Auth::id();
        $history = Peminjaman::with('fasilitas') 
                    ->where('user_id', $userId) 
                    ->orderBy('created_at', 'desc')
                    ->get();

        $formatted = $history->map(function($item) {
            return [
                'id' => $item->id,
                'facility' => $item->fasilitas->nama_fasilitas ?? 'Fasilitas Umum',
                'date' => $item->tanggal_reservasi,
                'time' => $item->waktu_mulai,
                'status' => $this->mapStatus($item->status_peminjaman),
                'purpose' => $item->keperluan_peminjaman,
            ];
        });

        return response()->json($formatted);
    }

    public function userBookings(Request $request)
    {
        $history = \App\Models\Peminjaman::with('fasilitas')
                ->where('user_id', $request->user()->id)
                ->orderBy('created_at', 'desc')
                ->get();

    $formatted = $history->map(function($item) {
        return [
            'id'       => $item->id,
            'facility' => $item->fasilitas->nama_fasilitas ?? 'Fasilitas',
            'date'     => $item->tanggal_reservasi,
            'time'     => $item->waktu_mulai,
            'status'   => $item->status_peminjaman, 
            'purpose'  => $item->keperluan_peminjaman,
        ];
    });

    return response()->json($formatted);
    }

    public function getBookedDates(Request $request)
    {
        $facilityName = $request->query('facility');
        $facilityId = ($facilityName === 'LAPANGAN') ? 2 : 1; 
        $bookedDates = Peminjaman::where('fasilitas_id', $facilityId)
            ->whereIn('status_peminjaman', ['Diajukan', 'Menunggu Konfirmasi', 'Disetujui']) 
            ->pluck('tanggal_reservasi'); 

        return response()->json($bookedDates);
    }

    private function mapStatus($dbStatus) {
        if ($dbStatus == 'Diajukan') return 'Menunggu Konfirmasi';
        return $dbStatus; 
    }
}