<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Panggil Seeder Fasilitas (Pastikan file FasilitasSeeder.php ada)
        $this->call(FasilitasSeeder::class);

        // 1. Akun ADMIN
        User::create([
            'nama_depan' => 'Admin',
            'nama_belakang' => 'RPTRA',
            'email' => 'admin@rptra.com',
            'no_telepon' => '081234567890',
            'password' => Hash::make('admin123'),
            'role' => 'Admin',
        ]);

        // 2. Akun WARGA
        User::create([
            'nama_depan' => 'Asep',
            'nama_belakang' => 'Kurniawan',
            'email' => 'warga@gmail.com',
            'no_telepon' => '089876543210',
            'password' => Hash::make('warga123'),
            'role' => 'Warga',
        ]);
    }
}