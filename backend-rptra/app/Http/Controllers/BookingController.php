<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peminjaman;
use App\Models\Fasilitas;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function create()
    {
        $fasilitas = Fasilitas::all();
        return view('peminjaman.create', compact('fasilitas'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'fasilitas_id' => 'required|exists:fasilitas,id',
            'kategori' => 'required|in:Umum,Organisasi,Kampus',
            'tanggal_reservasi' => 'required|date|after:today', 
            'waktu_mulai' => 'required',
            'keperluan_peminjaman' => 'required|string|max:500',
            'file_dokumen_syarat' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048', // Maks 2MB
        ]);

        $path = $request->file('file_dokumen_syarat')->store('dokumen_syarat', 'public');

        Peminjaman::create([
            'user_id' => Auth::id(), 
            'fasilitas_id' => $request->fasilitas_id,
            'kategori' => $request->kategori,
            'tanggal_reservasi' => $request->tanggal_reservasi,
            'waktu_mulai' => $request->waktu_mulai,
            'keperluan_peminjaman' => $request->keperluan_peminjaman,
            'file_dokumen_syarat' => $path, 
            'status_peminjaman' => 'Diajukan', 
        ]);

        return redirect()->route('home')->with('success', 'Pengajuan peminjaman berhasil dikirim! Menunggu persetujuan Admin.');
    }

    public function history()
    {
        $riwayat = Peminjaman::where('user_id', Auth::id())
                            ->with('fasilitas') 
                            ->latest()
                            ->get();

        return view('peminjaman.history', compact('riwayat'));
    }
}