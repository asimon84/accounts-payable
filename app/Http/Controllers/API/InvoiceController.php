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
     * @param int $id
     *
     * @return mixed
     */
    public function show(Request $request, int $id) {
        return Invoice::find($id)->toJSON();
    }

    /**
     * Update an invoice and return success or failure
     *
     * @param Request $request
     * @param int $id
     *
     * @return bool
     */
    public function edit(Request $request, int $id):bool {
        $record = Invoice::find($id);

        $record->string = $request->input('string');
        $record->text = $request->input('text');
        $record->json = $request->input('json');
        $record->boolean = filter_var($request->input('boolean'), FILTER_VALIDATE_BOOLEAN);
        $record->integer = (int) $request->input('integer');
        $record->float = (float) $request->input('float');

        return $record->save();
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
