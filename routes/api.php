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
    Route::get('/invoices', [InvoiceController::class, 'show'])->middleware(['ability:get-invoice'])->name('invoice.show');
    Route::patch('/invoices', [InvoiceController::class, 'update'])->middleware(['ability:edit-invoice'])->name('invoice.patch');
    Route::put('/invoices', [InvoiceController::class, 'update'])->middleware(['ability:edit-invoice'])->name('invoice.put');
    Route::delete('/invoices', [InvoiceController::class, 'destroy'])->middleware(['ability:delete-invoice'])->name('invoice.destroy');

    //Invoice Item resource Read, Update, Delete methods
    Route::get('/invoice-items', [InvoiceItemController::class, 'show'])->middleware(['ability:get-invoice-item'])->name('invoice-item.show');
    Route::patch('/invoice-items', [InvoiceItemController::class, 'update'])->middleware(['ability:edit-invoice-item'])->name('invoice-item.patch');
    Route::put('/invoice-items', [InvoiceItemController::class, 'update'])->middleware(['ability:edit-invoice-item'])->name('invoice-item.put');
    Route::delete('/invoice-items', [InvoiceItemController::class, 'destroy'])->middleware(['ability:delete-invoice-item'])->name('invoice-item.destroy');

    //Item resource Read, Update, Delete methods
    Route::get('/items', [ItemController::class, 'show'])->middleware(['ability:get-item'])->name('item.show');
    Route::patch('/items', [ItemController::class, 'update'])->middleware(['ability:edit-item'])->name('item.patch');
    Route::put('/items', [ItemController::class, 'update'])->middleware(['ability:edit-item'])->name('item.put');
    Route::delete('/items', [ItemController::class, 'destroy'])->middleware(['ability:delete-item'])->name('item.destroy');

    //Payments resource Read, Update, Delete methods
    Route::get('/payments', [PaymentController::class, 'show'])->middleware(['ability:get-payment'])->name('payment.show');
    Route::patch('/payments', [PaymentController::class, 'update'])->middleware(['ability:edit-payment'])->name('payment.patch');
    Route::put('/payments', [PaymentController::class, 'update'])->middleware(['ability:edit-payment'])->name('payment.put');
    Route::delete('/payments', [PaymentController::class, 'destroy'])->middleware(['ability:delete-payment'])->name('payment.destroy');
});
