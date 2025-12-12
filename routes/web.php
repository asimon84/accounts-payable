<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoicesController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', [LoginController::class, 'index'])->name('guestHome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/invoices', [InvoicesController::class, 'index'])->name('invoices');
    Route::get('/invoice/{invoice}', [InvoicesController::class, 'index'])->name('invoice');
    Route::get('/create-invoice', [InvoicesController::class, 'create'])->name('createInvoice');
    Route::get('/items', [ItemsController::class, 'index'])->name('items');
    Route::get('/item/{item}', [ItemsController::class, 'index'])->name('item');
    Route::get('/create-item', [ItemsController::class, 'create'])->name('createItem');
});

require __DIR__.'/settings.php';
