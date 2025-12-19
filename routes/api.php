<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ChartController;
use App\Http\Controllers\API\InvoiceController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\ReportsController;
use Illuminate\Support\Facades\Route;

//Basic User registration, login, and logout methods
Route::post('/register', [AuthController::class, 'register'])->name('api.register');
Route::post('/login', [AuthController::class, 'login'])->name('api.login');
Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');

//Custom token creation
Route::post('/token/create', [AuthController::class, 'createToken'])->name('token.create');

////Routes Behind Authentication
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/chart', [ChartController::class, 'getChartData']);

    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoice.index');
    Route::post('/invoice', [InvoiceController::class, 'store'])->name('invoice.store');
    Route::get('/invoice/{invoice}', [InvoiceController::class, 'show'])->name('invoice.show');
    Route::put('/invoice/{invoice}', [InvoiceController::class, 'edit'])->name('invoice.update');
    Route::delete('/invoice/{invoice}', [InvoiceController::class, 'destroy'])->name('invoice.destroy');
    Route::put('/invoice/{invoice}/submit', [InvoiceController::class, 'submit'])->name('invoice.submit');

    Route::get('/items', [ItemController::class, 'index'])->name('item.index');
    Route::post('/item', [ItemController::class, 'store'])->name('item.store');
    Route::get('/item/{item}', [ItemController::class, 'show'])->name('item.show');
    Route::put('/item/{item}', [ItemController::class, 'edit'])->name('item.update');
    Route::delete('/item/{item}', [ItemController::class, 'destroy'])->name('item.destroy');

    Route::post('/payments', [PaymentController::class, 'store'])->name('payment.store');

    Route::get('/reports/summary', [ReportsController::class, 'index'])->name('report.summary');
});
