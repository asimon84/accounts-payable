<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\InvoiceController;
use App\Http\Controllers\API\PaymentController;
use App\Http\Controllers\API\ItemController;
use App\Http\Controllers\API\InvoiceItemController;
use Illuminate\Support\Facades\Route;

//Basic User registration, login, and logout methods
Route::post('/register', [AuthController::class, 'register'])->name('api.register');
Route::post('/login', [AuthController::class, 'login'])->name('api.login');
Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');

//Custom token creation
Route::post('/token/create', [AuthController::class, 'createToken'])->name('token.create');

////Routes Behind Authentication
//Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/invoice/{invoice}', [InvoiceController::class, 'show'])->name('invoice.show');
    Route::put('/invoice/{invoice}', [InvoiceController::class, 'edit'])->name('invoice.update');
    Route::put('/invoice/{invoice}/submit', [InvoiceController::class, 'submit'])->name('invoice.submit');

//    //Invoice CRUD
//    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoice.index');
//    Route::post('/invoice', [InvoiceController::class, 'store'])->name('invoice.store');
//    Route::get('/invoices/{id}', [InvoiceController::class, 'show'])->name('invoice.show');
//    Route::patch('/invoices/{id}', [InvoiceController::class, 'edit'])->name('invoice.patch');
//    Route::put('/invoices/{id}', [InvoiceController::class, 'edit'])->name('invoice.put');
//    Route::delete('/invoices/{id}', [InvoiceController::class, 'destroy'])->name('invoice.destroy');
//
//    //Invoice Item CRUD
//    Route::get('/invoice-items', [InvoiceItemController::class, 'index'])->name('invoice-item.index');
//    Route::post('/invoice-items', [InvoiceItemController::class, 'store'])->name('invoice-item.store');
//    Route::get('/invoice-items/{id}', [InvoiceItemController::class, 'show'])->name('invoice-item.show');
//    Route::patch('/invoice-items/{id}', [InvoiceItemController::class, 'update'])->name('invoice-item.patch');
//    Route::put('/invoice-items/{id}', [InvoiceItemController::class, 'update'])->name('invoice-item.put');
//    Route::delete('/invoice-items/{id}', [InvoiceItemController::class, 'destroy'])->name('invoice-item.destroy');
//
//    //Item CRUD
//    Route::get('/items', [InvoiceController::class, 'index'])->name('item.index');
//    Route::post('/items', [ItemController::class, 'store'])->name('item.store');
//    Route::get('/items/{id}', [ItemController::class, 'show'])->name('item.show');
//    Route::patch('/items/{id}', [ItemController::class, 'update'])->name('item.patch');
//    Route::put('/items/{id}', [ItemController::class, 'update'])->name('item.put');
//    Route::delete('/items/{id}', [ItemController::class, 'destroy'])->name('item.destroy');
//
//    //Payments CRUD
//    Route::get('/payments', [PaymentController::class, 'index'])->name('payment.index');
//    Route::post('/payments', [PaymentController::class, 'store'])->name('payment.store');
//    Route::get('/payments/{id}', [PaymentController::class, 'show'])->name('payment.show');
//    Route::patch('/payments/{id}', [PaymentController::class, 'update'])->name('payment.patch');
//    Route::put('/payments/{id}', [PaymentController::class, 'update'])->name('payment.put');
//    Route::delete('/payments/{id}', [PaymentController::class, 'destroy'])->name('payment.destroy');
//});
