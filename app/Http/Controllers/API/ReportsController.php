<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReportsController extends Controller
{
    /**
     * Get reports summary
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request):JsonResponse {
        $invoices = Invoice::with(['invoiceItems'])->get();

        $count = $invoices->count();

        $unpaid = $invoices->where('paid', false)->count();

        $paid = $invoices->where('paid', true)->count();

        $amount = 0;

        return response()->json(compact('invoices', 'count', 'unpaid', 'paid', 'amount'));
    }
}
