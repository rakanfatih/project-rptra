<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FasilitasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Fasilitas::insert([
            [
                'nama_fasilitas' => 'Aula',
                'deskripsi' => 'Aula serbaguna untuk kegiatan indoor, rapat, dan senam.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_fasilitas' => 'Lapangan',
                'deskripsi' => 'Lapangan outdoor untuk futsal, bulutangkis, dan upacara.',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
