<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table = 'peminjaman';
    
    // UPDATE DISINI: Pastikan semua kolom baru terdaftar
    protected $fillable = [
        'user_id',
        'fasilitas_id',
        'kategori',
        'keperluan_peminjaman',
        'peralatan_tambahan',
        'tanggal_reservasi',
        'waktu_mulai',
        
        // Ganti 'file_dokumen_syarat' dengan 3 kolom ini:
        'file_ktp',
        'file_surat_permohonan',
        'file_surat_pengantar',
        
        'status_peminjaman',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }
}