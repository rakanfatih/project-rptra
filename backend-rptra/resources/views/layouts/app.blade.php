<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplikasi Peminjaman RPTRA</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div class="container">
            <a class="navbar-brand" href="{{ url('/') }}">RPTRA Lenteng Agung</a>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
    @auth
        @if(Auth::user()->role === 'Admin')
            <li class="nav-item">
                <a class="nav-link fw-bold text-warning" href="{{ route('admin.dashboard') }}">Dashboard Admin</a>
            </li>
        @else
            <li class="nav-item">
                <a class="nav-link" href="{{ route('peminjaman.create') }}">Ajukan Booking</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{{ route('peminjaman.history') }}">Riwayat Saya</a>
            </li>
        @endif

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown">
                Halo, {{ Auth::user()->nama_depan }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="dropdown-item text-danger">Logout</button>
                    </form>
                </li>
            </ul>
        </li>
    @else
        <li class="nav-item">
            <a class="nav-link" href="{{ route('login') }}">Masuk</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="{{ route('register') }}">Daftar</a>
        </li>
    @endauth
</ul>
            </div>
        </div>
    </nav>

    <div class="container">
        @if(session('success'))
            <div class="alert alert-success">{{ session('success') }}</div>
        @endif

        @if($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @yield('content')
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>