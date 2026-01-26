<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// URL Asli: http://127.0.0.1:8000/api/fasilitas
Route::get('/fasilitas', [ApiController::class, 'getFasilitas']);
// URL Asli: http://127.0.0.1:8000/api/peminjaman
Route::post('/peminjaman', [ApiController::class, 'storePeminjaman']);