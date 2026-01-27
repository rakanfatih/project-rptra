<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gallery;
use App\Models\FooterSetting;
use Illuminate\Support\Facades\Storage;

class CmsController extends Controller
{
    // --- GALLERY ---
    public function getGallery() {
        return response()->json(Gallery::latest()->get());
    }

    public function uploadGallery(Request $request) {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('gallery', 'public');
            
            $gallery = new Gallery();
            $gallery->image_path = $path;
            $gallery->save();

            return response()->json(['message' => 'Upload sukses', 'data' => $gallery]);
        }
        return response()->json(['message' => 'Gagal upload'], 400);
    }

    public function deleteGallery($id) {
        $gallery = Gallery::find($id);
        if ($gallery) {
            // Hapus file fisik
            Storage::disk('public')->delete($gallery->image_path);
            $gallery->delete();
            return response()->json(['message' => 'Foto dihapus']);
        }
        return response()->json(['message' => 'Foto tidak ditemukan'], 404);
    }

    // --- FOOTER ---
    public function getFooter() {
        // Ambil data pertama, jika tidak ada buat default kosong
        return response()->json(FooterSetting::first() ?? new FooterSetting());
    }

    public function saveFooter(Request $request) {
        // Ambil data pertama atau buat baru jika kosong
        $footer = FooterSetting::first() ?? new FooterSetting();
        
        $footer->alamat = $request->alamat;
        $footer->email = $request->email;
        $footer->telepon = $request->telepon;
        
        // SIMPAN JAM OPERASIONAL
        $footer->jam_operasional = $request->jam_operasional; 
        
        $footer->instagram = $request->instagram;
        $footer->deskripsi = $request->deskripsi;
        
        $footer->save();

        return response()->json(['message' => 'Footer disimpan', 'data' => $footer]);
    }
}