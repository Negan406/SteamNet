<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\AdminMiddleware;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-email', [AuthController::class, 'verify']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

Route::get('/packages', [PackageController::class, 'index']);
Route::get('/packages/{id}', [PackageController::class, 'show']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/subscriptions', [SubscriptionController::class, 'index']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);

    Route::middleware([AdminMiddleware::class])->prefix('admin')->group(function () {
        Route::get('/packages', [AdminController::class, 'getPackages']);
        Route::post('/packages', [AdminController::class, 'storePackage']);
        Route::put('/packages/{id}', [AdminController::class, 'updatePackage']);
        Route::delete('/packages/{id}', [AdminController::class, 'deletePackage']);

        Route::get('/users', [AdminController::class, 'getUsers']);
        Route::get('/orders', [AdminController::class, 'getOrders']);
        
        // IPTV Accounts
        Route::get('/iptv-accounts', [AdminController::class, 'getIptvAccounts']);
        Route::post('/iptv-accounts', [AdminController::class, 'storeIptvAccount']);
        Route::put('/iptv-accounts/{id}', [AdminController::class, 'updateIptvAccount']);
        Route::delete('/iptv-accounts/{id}', [AdminController::class, 'deleteIptvAccount']);
        Route::post('/iptv-accounts/import', [AdminController::class, 'importIptvAccounts']);

        Route::get('/stats', [AdminController::class, 'dashboardStats']);
    });
});
