<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\InvoiceItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Routes Behind Authentication
Route::middleware(['auth:sanctum'])->group(function () {
    //Invoice resource Read, Update, Delete methods
    Route::get('/invoices', [InvoiceController::class, 'show'])->name('invoice.show');
    Route::patch('/invoices', [InvoiceController::class, 'update'])->name('invoice.patch');
    Route::put('/invoices', [InvoiceController::class, 'update'])->name('invoice.put');
    Route::delete('/invoices', [InvoiceController::class, 'destroy'])->name('invoice.destroy');

    //Invoice Item resource Read, Update, Delete methods
    Route::get('/invoice-items', [InvoiceItemController::class, 'show'])->name('invoice-item.show');
    Route::patch('/invoice-items', [InvoiceItemController::class, 'update'])->name('invoice-item.patch');
    Route::put('/invoice-items', [InvoiceItemController::class, 'update'])->name('invoice-item.put');
    Route::delete('/invoice-items', [InvoiceItemController::class, 'destroy'])->name('invoice-item.destroy');

    //Item resource Read, Update, Delete methods
    Route::get('/items', [ItemController::class, 'show'])->name('item.show');
    Route::patch('/items', [ItemController::class, 'update'])->name('item.patch');
    Route::put('/items', [ItemController::class, 'update'])->name('item.put');
    Route::delete('/items', [ItemController::class, 'destroy'])->name('item.destroy');

    //Payments resource Read, Update, Delete methods
    Route::get('/payments', [PaymentController::class, 'show'])->name('payment.show');
    Route::patch('/payments', [PaymentController::class, 'update'])->name('payment.patch');
    Route::put('/payments', [PaymentController::class, 'update'])->name('payment.put');
    Route::delete('/payments', [PaymentController::class, 'destroy'])->name('payment.destroy');
});
