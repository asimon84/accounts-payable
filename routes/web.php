<?php

use App\Http\Controllers\CreateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DetailsController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', [LoginController::class, 'index'])->name('guestHome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices');
    Route::get('/invoice/{invoice}', [DetailsController::class, 'index'])->name('details');
    Route::post('/invoice/{invoice}', [DetailsController::class, 'update'])->name('update');
    Route::get('/create', [CreateController::class, 'index'])->name('create');
});

require __DIR__.'/settings.php';
