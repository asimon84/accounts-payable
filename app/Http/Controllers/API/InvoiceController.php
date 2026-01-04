<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
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
        return response()->json(['data' => Invoice::select('id', 'customer_name', 'due_date', 'paid')->get()]);
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

        foreach($request->get('items') as $item) {
            $items[] = $item['props']['id'];
        }

        foreach(array_count_values($items) as $key => $value) {
            $data[] = [
                'invoice_id' => $invoice->id,
                'item_id' => $key,
                'quantity' => $value,
            ];
        }

        InvoiceItem::insert($data);

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

        foreach($request->get('items') as $item) {
            $items[] = $item['props']['id'];
        }

        foreach(array_count_values($items) as $key => $value) {
            $data[] = [
                'invoice_id' => $invoice->id,
                'item_id' => $key,
                'quantity' => $value,
            ];
        }

        InvoiceItem::insert($data);

        return response()->json([
            'success' => $success,
            'invoice' => $invoice,
        ]);
    }

    /**
     * Remove the specified Invoice
     *
     * @param Invoice $invoice
     * @return mixed
     */
    public function destroy(Invoice $invoice)
    {
        $success = $invoice->delete() ? true : false;
        $message = ($success) ? 'Invoice deleted successfully.' : 'Task failed. Invoice not deleted.';

        return response()->json([
            'success' => $success,
            'message' => $message
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
