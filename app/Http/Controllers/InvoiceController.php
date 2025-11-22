<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    /**
     * Show the view for the Invoice page
     *
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request):Response
    {
        $invoices = Invoice::all();
        $payments = Payment::all();

        return Inertia::render('invoices', compact('invoices', 'payments'));
    }
}
