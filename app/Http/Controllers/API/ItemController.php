<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Get data for items
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request):JsonResponse {
        return response()->json(['data' => Item::all()]);
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
//        if ($request->get('paid') !== null) {
//            $paid = filter_var($request->get('paid'), FILTER_VALIDATE_BOOLEAN);
//        } else {
//            $paid = false;
//        }
//
//        $request->merge(['paid' => $paid]);
//
//        $request->validate([
//            'customer_name' => 'string|max:255',
//            'due_date' => 'string|max:255',
//            'paid' => 'boolean',
//        ]);
//
//        $invoice = Invoice::create([
//            'customer_name' => $request->get('customer_name'),
//            'due_date' => $request->get('due_date'),
//            'paid' => filter_var($request->get('paid'), FILTER_VALIDATE_BOOLEAN),
//        ]);
//
//        return $item->toJSON();
    }

    /**
     * Get data for items modal
     *
     * @param Request $request
     * @param Item $item
     *
     * @return mixed
     */
    public function show(Request $request, Item $item) {
        return $item->toJSON();
    }

    /**
     * Update an items and return success or failure
     *
     * @param Request $request
     * @param Item $item
     *
     * @return JsonResponse
     */
    public function edit(Request $request, Item $item):JsonResponse {
//        if ($request->get('paid') !== null) {
//            $paid = filter_var($request->get('paid'), FILTER_VALIDATE_BOOLEAN);
//        } else {
//            $paid = false;
//        }
//
//        $request->merge(['paid' => $paid]);
//
//        $validatedData = $request->validate([
//            'customer_name' => 'string|max:255',
//            'due_date' => 'string|max:255',
//            'paid' => 'boolean',
//        ]);
//
//        $success = $invoice->update($validatedData);
//
//        return response()->json([
//            'success' => $success,
//            'invoice' => $invoice,
//        ]);
    }

    /**
     * Remove the specified Item
     *
     * @param Item $item
     * @return mixed
     */
    public function destroy(Item $item)
    {
        $success = $item->delete() ? true : false;
        $message = ($success) ? 'Item deleted successfully.' : 'Task failed. Item not deleted.';

        return response()->json([
            'success' => $success,
            'message' => $message
        ]);
    }

    /**
     * Submit an item and return success or failure
     *
     * @param Request $request
     * @param Item $item
     *
     * @return bool
     */
    public function submit(Request $request, Item $item):bool {
        return true;
    }
}
