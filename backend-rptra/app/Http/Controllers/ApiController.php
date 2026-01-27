<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fasilitas;

class ApiController extends Controller
{
    public function getFasilitas()
    {
        $fasilitas = Fasilitas::all();
        return response()->json($fasilitas);
    }
}