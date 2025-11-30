<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class PaymentController extends Controller
{
    /**
     * Get data for payment table
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request):JsonResponse {
        return DataTables::of(Payment::all())
            ->addIndexColumn()
            ->addColumn('action', function($row){
                $buttons = '<div style="width: 130px;">';

                $buttons .= '<button type="button" class="btn btn-info view-record" data-bs-toggle="modal" data-bs-target="#recordModal" data-id='.$row->id.'><i class="bi bi-search"></i></button>';
                $buttons .= '<button type="button" class="btn btn-success edit-record" data-bs-toggle="modal" data-bs-target="#recordModal" data-id='.$row->id.'><i class="bi bi-pencil"></i></button>';
                $buttons .= '<button type="button" class="btn btn-danger delete-record" data-id='.$row->id.'><i class="bi bi-trash"></i></button>';

                $buttons .= '</div>';

                return $buttons;
            })
            ->rawColumns(['action'])
            ->make(true);
    }

    /**
     * Store a newly created payment
     *
     * @param Request $request
     *
     * @return mixed
     */
    public function store(Request $request)
    {
        $paid = true;

        $request->validate([
            'invoiceId' => 'string|max:255',
            'amount' => 'string|max:255',
        ]);

        $invoice = Invoice::find($request->get('invoiceId'));

        $invoice->amount = $request->get('amount');
        $invoice->paid = $paid;

        return $invoice->toJSON();
    }

    /**
     * Get data for payment modal
     *
     * @param Request $request
     * @param int $id
     *
     * @return mixed
     */
    public function show(Request $request, int $id) {
        return Payment::find($id)->toJSON();
    }

    /**
     * Update a payment and return success or failure
     *
     * @param Request $request
     * @param int $id
     *
     * @return bool
     */
    public function edit(Request $request, int $id):bool {
        $record = Payment::find($id);

        $record->string = $request->input('string');
        $record->text = $request->input('text');
        $record->json = $request->input('json');
        $record->boolean = filter_var($request->input('boolean'), FILTER_VALIDATE_BOOLEAN);
        $record->integer = (int) $request->input('integer');
        $record->float = (float) $request->input('float');

        return $record->save();
    }

    /**
     * Delete a payment and return success or failure
     *
     * @param Request $request
     * @param int $id
     *
     * @return bool
     */
    public function delete(Request $request, int $id):bool {
        return (bool) Payment::destroy($id);
    }
}
