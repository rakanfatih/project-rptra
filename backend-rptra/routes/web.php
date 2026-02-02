<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;

//landing page
Route::get('/', function () {
    return view('home'); 
})->name('home');

// login
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);

// Register
Route::get('/register', [AuthController::class, 'showRegisterForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);

// Logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/admin/dashboard', function() {
    return 'Halo Admin! Ini Dashboard Anda.';
});

// warga 
Route::middleware(['auth'])->group(function () {
    // menampilkan Form
    Route::get('/ajukan-peminjaman', [BookingController::class, 'create'])->name('peminjaman.create');
    Route::get('/riwayat-saya', [BookingController::class, 'history'])->name('peminjaman.history');
    
    // simpan data
    Route::post('/ajukan-peminjaman', [BookingController::class, 'store'])->name('peminjaman.store');
});

// admin
Route::middleware(['auth', 'is_admin'])->group(function () {
    // dashboard 
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    
    // approval
    Route::patch('/admin/approve/{id}', [AdminController::class, 'approve'])->name('admin.approve');
    Route::patch('/admin/reject/{id}', [AdminController::class, 'reject'])->name('admin.reject');
});