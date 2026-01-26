<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('peminjaman', function (Blueprint $table) {
        $table->id();
        
        //foreign key
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->foreignId('fasilitas_id')->constrained('fasilitas')->onDelete('cascade');
        
        //data peminjaman
        $table->enum('kategori', ['Umum', 'Organisasi', 'Kampus']); 
        $table->text('keperluan_peminjaman');
        $table->date('tanggal_reservasi');
        $table->time('waktu_mulai');
        $table->string('file_dokumen_syarat'); 
        
        //status
        $table->enum('status_peminjaman', ['Diajukan', 'Disetujui', 'Ditolak'])->default('Diajukan');

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjaman');
    }
};
