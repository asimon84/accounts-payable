<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    /**
     * Get data for payment modal
     *
     * @param Request $request
     * @param Invoice $invoice
     *
     * @return mixed
     */
    public function show(Request $request, Invoice $invoice) {
        return $invoice->toJSON();
    }
}
