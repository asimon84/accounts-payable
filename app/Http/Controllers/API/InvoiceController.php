<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Get data for invoices table
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request):JsonResponse {
        return response()->json(['data' => Invoice::all()]);
    }

    /**
     * Get data for invoices modal
     *
     * @param Request $request
     * @param Invoice $invoice
     *
     * @return mixed
     */
    public function show(Request $request, Invoice $invoice) {
        return $invoice->toJSON();
    }

    /**
     * Update an invoice and return success or failure
     *
     * @param Request $request
     * @param Invoice $invoice
     *
     * @return JsonResponse
     */
    public function edit(Request $request, Invoice $invoice):JsonResponse {
        if ($request->get('paid') !== null) {
            $paid = filter_var($request->get('paid'), FILTER_VALIDATE_BOOLEAN);
            $invoice->paid = $request->get('paid', $paid);
        }

        $invoice->customer_name = $request->get('customer_name', $invoice->customer_name);
        $invoice->due_date = $request->get('due_date', $invoice->due_date);
        $invoice->paid = $request->get('paid', $invoice->paid);

        $validatedData = $request->validate([
            'customer_name' => 'string|max:255',
            'due_date' => 'string|max:255',
            'paid' => 'boolean',
        ]);

        $success = $invoice->update($validatedData);

        return response()->json([
            'success' => $success,
            'invoice' => $invoice,
        ]);
    }

    /**
     * Delete an invoice and return success or failure
     *
     * @param Request $request
     * @param int $id
     *
     * @return bool
     */
    public function delete(Request $request, int $id):bool {
        return (bool) Invoice::destroy($id);
    }
}
