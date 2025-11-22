<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DetailsController extends Controller
{
    /**
     * Show the view for the Details page
     *
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request):Response
    {
        $invoices = Invoice::all();
        $payments = Payment::all();

        return Inertia::render('details', compact('invoices', 'payments'));
    }
}
