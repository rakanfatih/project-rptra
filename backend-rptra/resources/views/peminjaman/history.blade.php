@extends('layouts.app')

@section('content')
<div class="container">
    <div class="card shadow">
        <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Riwayat Peminjaman Saya</h4>
        </div>
        <div class="card-body">
            @if($riwayat->isEmpty())
                <div class="text-center py-4">
                    <p class="text-muted">Anda belum pernah mengajukan peminjaman.</p>
                    <a href="{{ route('peminjaman.create') }}" class="btn btn-success">Ajukan Sekarang</a>
                </div>
            @else
                <div class="table-responsive">
                    <table class="table table-hover table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>No</th>
                                <th>Fasilitas</th>
                                <th>Tanggal Reservasi</th>
                                <th>Keperluan</th>
                                <th>Status</th>
                                <th>Tanggal Pengajuan</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($riwayat as $index => $item)
                            <tr>
                                <td>{{ $index + 1 }}</td>
                                <td>{{ $item->fasilitas->nama_fasilitas }}</td>
                                <td>
                                    <strong>{{ \Carbon\Carbon::parse($item->tanggal_reservasi)->format('d M Y') }}</strong><br>
                                    <small>{{ $item->waktu_mulai }} WIB</small>
                                </td>
                                <td>{{ $item->keperluan_peminjaman }}</td>
                                <td>
                                    @if($item->status_peminjaman == 'Diajukan')
                                        <span class="badge bg-warning text-dark">Menunggu Konfirmasi</span>
                                    @elseif($item->status_peminjaman == 'Disetujui')
                                        <span class="badge bg-success">Disetujui</span>
                                    @else
                                        <span class="badge bg-danger">Ditolak</span>
                                    @endif
                                </td>
                                <td>{{ $item->created_at->format('d/m/Y H:i') }}</td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection