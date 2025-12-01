<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Store a newly created payment
     *
     * @param Request $request
     *
     * @return mixed
     */
    public function store(Request $request)
    {
        $request->validate([
            'invoiceId' => 'int',
            'amount' => 'int',
        ]);

        $invoice = Invoice::find($request->get('invoiceId'));

//        $invoice->amount = $request->get('amount');
        $invoice->paid = true;

        return $invoice->toJSON();
    }
}
