<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\User;
use App\Models\Order;
use App\Models\IptvAccount;
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
            'category' => 'required|string',
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
        return response()->json(Order::with(['user.iptvAccounts', 'package'])->orderBy('id', 'desc')->get());
    }

    // IPTV Accounts
    public function getIptvAccounts() {
        return response()->json(IptvAccount::with('user')->orderBy('id', 'desc')->get());
    }

    public function storeIptvAccount(Request $request) {
        $validated = $request->validate([
            'username' => 'required|string|unique:iptv_accounts,username',
            'password' => 'required|string',
            'server_url' => 'required|string',
            'category' => 'required|string',
            'expire_date' => 'nullable|date',
            'status' => 'in:available,sold',
            'user_id' => 'nullable|exists:users,id'
        ]);
        return response()->json(IptvAccount::create($validated), 201);
    }

    public function updateIptvAccount(Request $request, $id) {
        $account = IptvAccount::findOrFail($id);
        $validated = $request->validate([
            'username' => 'string|unique:iptv_accounts,username,' . $id,
            'password' => 'string',
            'server_url' => 'string',
            'category' => 'string',
            'expire_date' => 'nullable|date',
            'status' => 'in:available,sold',
            'user_id' => 'nullable|exists:users,id'
        ]);
        $account->update($validated);
        return response()->json($account);
    }

    public function deleteIptvAccount($id) {
        IptvAccount::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }

    public function importIptvAccounts(Request $request) {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt'
        ]);

        $file = $request->file('file');
        $csvData = file_get_contents($file);
        $lines = explode(PHP_EOL, $csvData);
        $imported = 0;

        foreach ($lines as $index => $line) {
            if ($index == 0 || empty(trim($line))) continue; // Skip header or empty lines
            
            $data = str_getcsv($line);
            if (count($data) >= 4) {
                IptvAccount::firstOrCreate(
                    ['username' => trim($data[0])],
                    [
                        'password' => trim($data[1]),
                        'server_url' => trim($data[2]),
                        'category' => trim($data[3]),
                        'status' => 'available'
                    ]
                );
                $imported++;
            }
        }

        return response()->json(['message' => "$imported accounts imported successfully"]);
    }

    // Dashboard Stats
    public function dashboardStats() {
        $totalUsers = User::where('role', 'user')->count();
        $totalRevenue = Order::where('status', 'completed')->sum('amount');
        $activeSubscriptions = \App\Models\Subscription::where('status', 'active')->count();
        $availableAccounts = IptvAccount::where('status', 'available')->count();
        $soldAccounts = IptvAccount::where('status', 'sold')->count();

        // Revenue by month (last 6 months)
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

        // User Growth (last 6 months)
        $userGrowthChart = User::selectRaw('COUNT(*) as total, MONTH(created_at) as month, YEAR(created_at) as year')
            ->where('role', 'user')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get()->map(function($item) {
                return [
                    'name' => date('M', mktime(0, 0, 0, $item->month, 10)),
                    'users' => (int)$item->total
                ];
            });

        // Sales count by month (last 6 months)
        $salesChart = Order::selectRaw('COUNT(*) as total, MONTH(created_at) as month, YEAR(created_at) as year')
            ->where('status', 'completed')
            ->where('created_at', '>=', now()->subMonths(6))
            ->groupBy('year', 'month')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get()->map(function($item) {
                return [
                    'name' => date('M', mktime(0, 0, 0, $item->month, 10)),
                    'sales' => (int)$item->total
                ];
            });

        // Category stats breakdown
        $categoryDistribution = IptvAccount::selectRaw('category, status, count(*) as count')
            ->groupBy('category', 'status')
            ->get();

        // Order status counts
        $paidOrders = Order::where('status', 'completed')->count();
        $pendingOrders = Order::where('status', 'pending')->count();
        $failedOrders = Order::where('status', 'failed')->count();

        return response()->json([
            'total_users' => $totalUsers,
            'total_revenue' => $totalRevenue,
            'active_subscriptions' => $activeSubscriptions,
            'available_accounts' => $availableAccounts,
            'sold_accounts' => $soldAccounts,
            'paid_orders' => $paidOrders,
            'pending_orders' => $pendingOrders,
            'failed_orders' => $failedOrders,
            'revenue_chart' => $revenueChart,
            'user_growth_chart' => $userGrowthChart,
            'sales_chart' => $salesChart,
            'category_distribution' => $categoryDistribution
        ]);
    }
}
