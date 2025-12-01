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
     * Store a newly created invoice
     *
     * @param Request $request
     *
     * @return mixed
     */
    public function store(Request $request)
    {
        if ($request->get('paid') !== null) {
            $paid = filter_var($request->get('paid'), FILTER_VALIDATE_BOOLEAN);
        } else {
            $paid = false;
        }

        $request->merge(['paid' => $paid]);

        $request->validate([
            'customer_name' => 'string|max:255',
            'due_date' => 'string|max:255',
            'paid' => 'boolean',
        ]);

        $invoice = Invoice::create([
            'customer_name' => $request->get('customer_name'),
            'due_date' => $request->get('due_date'),
            'paid' => filter_var($request->get('paid'), FILTER_VALIDATE_BOOLEAN),
        ]);

        return $invoice->toJSON();
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
        } else {
            $paid = false;
        }

        $request->merge(['paid' => $paid]);

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
     * Submit an invoice and return success or failure
     *
     * @param Request $request
     * @param Invoice $invoice
     *
     * @return bool
     */
    public function submit(Request $request, Invoice $invoice):bool {
        return true;
    }
}
