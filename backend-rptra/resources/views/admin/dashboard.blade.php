@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="card shadow">
        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Dashboard Admin - Kelola Peminjaman</h4>
            <span class="badge bg-secondary">Total: {{ $peminjaman->count() }} Pengajuan</span>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>No</th>
                            <th>Nama Peminjam</th>
                            <th>Fasilitas</th>
                            <th>Tanggal & Waktu</th>
                            <th>Keperluan</th>
                            <th>Dokumen</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($peminjaman as $index => $item)
                        <tr>
                            <td>{{ $index + 1 }}</td>
                            <td>
                                <strong>{{ $item->user->nama_depan }} {{ $item->user->nama_belakang }}</strong><br>
                                <small class="text-muted">{{ $item->kategori }}</small>
                            </td>
                            <td>{{ $item->fasilitas->nama_fasilitas }}</td>
                            <td>
                                {{ \Carbon\Carbon::parse($item->tanggal_reservasi)->format('d M Y') }}<br>
                                <small>{{ $item->waktu_mulai }}</small>
                            </td>
                            <td>{{Str::limit($item->keperluan_peminjaman, 50) }}</td>
                            <td>
                                <a href="{{ asset('storage/' . $item->file_dokumen_syarat) }}" target="_blank" class="btn btn-sm btn-info text-white">
                                    Lihat File
                                </a>
                            </td>
                            <td>
                                @if($item->status_peminjaman == 'Diajukan')
                                    <span class="badge bg-warning text-dark">Diajukan</span>
                                @elseif($item->status_peminjaman == 'Disetujui')
                                    <span class="badge bg-success">Disetujui</span>
                                @else
                                    <span class="badge bg-danger">Ditolak</span>
                                @endif
                            </td>
                            <td>
                                @if($item->status_peminjaman == 'Diajukan')
                                    <form action="{{ route('admin.approve', $item->id) }}" method="POST" class="d-inline">
                                        @csrf @method('PATCH')
                                        <button type="submit" class="btn btn-success btn-sm" onclick="return confirm('Yakin setujui?')">ACC</button>
                                    </form>
                                    <form action="{{ route('admin.reject', $item->id) }}" method="POST" class="d-inline">
                                        @csrf @method('PATCH')
                                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Yakin tolak?')">Tolak</button>
                                    </form>
                                @else
                                    <span class="text-muted small">Selesai</span>
                                @endif
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection