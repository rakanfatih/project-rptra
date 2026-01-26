<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Peminjaman;

class AdminController extends Controller
{
    public function index()
    {
        $peminjaman = Peminjaman::with(['user', 'fasilitas'])->latest()->get();
        
        return view('admin.dashboard', compact('peminjaman'));
    }

    public function approve($id)
    {
        $data = Peminjaman::findOrFail($id);
        $data->status_peminjaman = 'Disetujui';
        $data->save();

        return redirect()->back()->with('success', 'Peminjaman berhasil DISETUJUI.');
    }

    public function reject($id)
    {
        $data = Peminjaman::findOrFail($id);
        $data->status_peminjaman = 'Ditolak';
        $data->save();

        return redirect()->back()->with('success', 'Peminjaman berhasil DITOLAK.');
    }
}