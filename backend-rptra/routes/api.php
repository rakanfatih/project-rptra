<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CmsController; 

Route::get('/cms/gallery', [CmsController::class, 'getGallery']);
Route::get('/cms/footer', [CmsController::class, 'getFooter']);

// Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/admin/login', [AdminController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    
    // User / Warga
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Booking
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/riwayat-saya', [BookingController::class, 'userBookings']);

    // Admin Dashboard
    Route::get('/admin/dashboard', [AdminController::class, 'index']);
    Route::patch('/admin/approve/{id}', [AdminController::class, 'approve']);
    Route::patch('/admin/reject/{id}', [AdminController::class, 'reject']);

    // CMS: Modifikasi Data (Hanya Admin yang boleh)
    Route::post('/cms/gallery', [CmsController::class, 'uploadGallery']);
    Route::delete('/cms/gallery/{id}', [CmsController::class, 'deleteGallery']);
    Route::post('/cms/footer', [CmsController::class, 'saveFooter']);

    Route::get('/booked-dates', [BookingController::class, 'getBookedDates']);
});