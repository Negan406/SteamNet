<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Packages
    public function getPackages() {
        return response()->json(Package::orderBy('id', 'desc')->get());
    }

    public function storePackage(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'duration_days' => 'required|integer',
            'is_active' => 'boolean'
        ]);
        return response()->json(Package::create($validated), 201);
    }

    public function updatePackage(Request $request, $id) {
        $package = Package::findOrFail($id);
        $package->update($request->all());
        return response()->json($package);
    }

    public function deletePackage($id) {
        Package::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }

    // Users
    public function getUsers() {
        return response()->json(User::with('subscriptions', 'orders')->get());
    }

    // Orders
    public function getOrders() {
        return response()->json(Order::with(['user', 'package'])->orderBy('id', 'desc')->get());
    }
}
