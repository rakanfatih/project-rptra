<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('peminjaman', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('fasilitas_id')->constrained('fasilitas')->onDelete('cascade');
            
            $table->enum('kategori', ['Umum', 'Organisasi', 'Kampus']); 
            $table->text('keperluan_peminjaman');
            $table->date('tanggal_reservasi');
            $table->string('waktu_mulai');
            
            // --- UPDATE DISINI: KOLOM FILE DIPISAH ---
            $table->string('file_ktp'); // Wajib
            $table->string('file_surat_permohonan'); // Wajib
            $table->string('file_surat_pengantar')->nullable(); // Boleh kosong (Khusus Umum)
            
            $table->enum('status_peminjaman', ['Diajukan', 'Disetujui', 'Ditolak'])->default('Diajukan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peminjaman');
    }
};