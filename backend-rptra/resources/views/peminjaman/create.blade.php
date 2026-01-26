@extends('layouts.app')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h4 class="mb-0">Formulir Peminjaman RPTRA</h4>
            </div>
            <div class="card-body">
                <form action="{{ route('peminjaman.store') }}" method="POST" enctype="multipart/form-data">
                    @csrf

                    <div class="mb-3">
                        <label class="form-label fw-bold">Pilih Fasilitas</label>
                        <select name="fasilitas_id" class="form-select" required>
                            <option value="">-- Pilih Aula / Lapangan --</option>
                            @foreach($fasilitas as $item)
                                <option value="{{ $item->id }}">{{ $item->nama_fasilitas }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">Kategori Peminjam</label>
                        <select name="kategori" class="form-select" required>
                            <option value="Umum">Umum</option>
                            <option value="Organisasi">Organisasi</option>
                            <option value="Kampus">Kampus</option>
                        </select>
                    </div>

                    <div class="row mb-3">
                        <div class="col">
                            <label class="form-label fw-bold">Tanggal Reservasi</label>
                            <input type="date" name="tanggal_reservasi" class="form-control" required>
                        </div>
                        <div class="col">
                            <label class="form-label fw-bold">Waktu Mulai</label>
                            <input type="time" name="waktu_mulai" class="form-control" required>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">Keperluan / Nama Acara</label>
                        <textarea name="keperluan_peminjaman" class="form-control" rows="3" placeholder="Contoh: Rapat Karang Taruna / Latihan Futsal" required></textarea>
                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">Upload Dokumen Syarat (KTP/Surat Pengantar)</label>
                        <input type="file" name="file_dokumen_syarat" class="form-control" accept=".pdf,.jpg,.png" required>
                        <small class="text-muted">Format: PDF/JPG. Maksimal 2MB.</small>
                    </div>

                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-success btn-lg">Ajukan Reservasi</button>
                        <a href="{{ route('home') }}" class="btn btn-secondary">Batal</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection