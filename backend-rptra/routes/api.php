<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\CmsController;

// === PUBLIC (Tanpa Login) ===
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/fasilitas', [ApiController::class, 'getFasilitas']);

// === PRIVATE (Harus Login / Pakai Token) ===
Route::middleware('auth:sanctum')->group(function () {
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) { return $request->user(); });

    // Warga
    Route::post('/peminjaman', [BookingController::class, 'store']);
    Route::get('/riwayat-saya', [BookingController::class, 'history']);

    // Admin
    Route::prefix('admin')->middleware(\App\Http\Middleware\IsAdmin::class)->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index']);
        Route::patch('/approve/{id}', [AdminController::class, 'approve']);
        Route::patch('/reject/{id}', [AdminController::class, 'reject']);
    });

    Route::get('/booked-dates', [BookingController::class, 'getBookedDates']);
    
    Route::get('/cms/gallery', [CmsController::class, 'getGallery']);
    Route::post('/cms/gallery', [CmsController::class, 'uploadGallery']);
    Route::delete('/cms/gallery/{id}', [CmsController::class, 'deleteGallery']);

    Route::get('/cms/footer', [CmsController::class, 'getFooter']);
    Route::post('/cms/footer', [CmsController::class, 'saveFooter']);
});