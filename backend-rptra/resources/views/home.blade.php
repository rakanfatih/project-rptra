@extends('layouts.app')

@section('content')
<div class="container text-center mt-5">
    <div class="p-5 mb-4 bg-light rounded-3 shadow-sm">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Selamat Datang di RPTRA Lenteng Agung</h1>
            <p class="col-md-8 fs-4 mx-auto">Sistem Peminjaman Fasilitas Lapangan dan Aula Terpadu.</p>
            
            @auth
                <div class="alert alert-success mt-4">
                    Anda sudah masuk sebagai <strong>{{ Auth::user()->nama_depan }}</strong>.
                </div>
                <a href="#" class="btn btn-primary btn-lg mt-3">Lihat Jadwal & Reservasi</a>
            @else
                <p class="mt-4">Silakan masuk atau daftar untuk melakukan reservasi.</p>
                <a href="{{ route('login') }}" class="btn btn-primary btn-lg">Masuk</a>
                <a href="{{ route('register') }}" class="btn btn-secondary btn-lg">Daftar</a>
            @endauth
        </div>
    </div>
</div>
@endsection