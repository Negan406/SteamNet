<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function index()
    {
        $packages = Package::where('is_active', true)->get();
        return response()->json($packages);
    }

    public function show($id)
    {
        $package = Package::where('is_active', true)->findOrFail($id);
        return response()->json($package);
    }
}
