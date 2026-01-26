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
        'tanggal_reservasi',
        'waktu_mulai',
        'file_dokumen_syarat',
        'status_peminjaman',
    ];

    //relasi
    //1 to 1
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //1 to 1
    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class);
    }
}
