<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    use HasFactory;

    // Tambahkan 'jam_operasional' ke sini agar bisa di-save
    protected $fillable = [
        'alamat', 
        'email', 
        'telepon', 
        'jam_operasional', // <--- WAJIB DITAMBAHKAN
        'instagram', 
        'deskripsi'
    ];
}