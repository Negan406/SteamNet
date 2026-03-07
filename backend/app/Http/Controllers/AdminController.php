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

    // Dashboard Stats
    public function dashboardStats() {
        $totalUsers = User::where('role', 'user')->count();
        $totalRevenue = Order::where('status', 'completed')->sum('amount');
        $activeSubscriptions = \App\Models\Subscription::where('status', 'active')->count();

        // Simple revenue by month chart data (last 6 months)
        $revenueChart = Order::selectRaw('SUM(amount) as total, MONTH(created_at) as month, YEAR(created_at) as year')
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get()->map(function($item) {
                return [
                    'name' => date('M', mktime(0, 0, 0, $item->month, 10)),
                    'total' => (float)$item->total
                ];
            });

        return response()->json([
            'total_users' => $totalUsers,
            'total_revenue' => $totalRevenue,
            'active_subscriptions' => $activeSubscriptions,
            'revenue_chart' => $revenueChart
        ]);
    }
}
