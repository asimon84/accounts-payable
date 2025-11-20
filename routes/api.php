<?php

use App\Http\Controllers\InvoiceController;
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
});
