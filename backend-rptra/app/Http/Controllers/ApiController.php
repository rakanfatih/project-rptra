<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fasilitas;
use App\Models\Peminjaman;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function getFasilitas()
    {
        $fasilitas = Fasilitas::all();
        
        return response()->json([
            'status' => 'success',
            'data' => $fasilitas
        ], 200);
    }

    public function storePeminjaman(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id', 
            'fasilitas_id' => 'required|exists:fasilitas,id',
            'kategori' => 'required|in:Umum,Organisasi,Kampus',
            'tanggal_reservasi' => 'required|date|after:today',
            'waktu_mulai' => 'required',
            'keperluan_peminjaman' => 'required|string',
            'file_dokumen_syarat' => 'required|file|mimes:pdf,jpg,png|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data tidak valid',
                'errors' => $validator->errors()
            ], 422);
        }

        $path = $request->file('file_dokumen_syarat')->store('dokumen_syarat', 'public');

        $peminjaman = Peminjaman::create([
            'user_id' => $request->user_id, 
            'fasilitas_id' => $request->fasilitas_id,
            'kategori' => $request->kategori,
            'tanggal_reservasi' => $request->tanggal_reservasi,
            'waktu_mulai' => $request->waktu_mulai,
            'keperluan_peminjaman' => $request->keperluan_peminjaman,
            'file_dokumen_syarat' => $path,
            'status_peminjaman' => 'Diajukan',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Pengajuan berhasil dikirim!',
            'data' => $peminjaman
        ], 201);
    }
}