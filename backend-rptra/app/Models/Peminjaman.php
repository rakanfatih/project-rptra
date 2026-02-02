<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table = 'peminjaman';
    
    protected $fillable = [
        'user_id',
        'fasilitas_id',
        'kategori',
        'keperluan_peminjaman',
        'peralatan_tambahan',
        'tanggal_reservasi',
        'waktu_mulai',
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