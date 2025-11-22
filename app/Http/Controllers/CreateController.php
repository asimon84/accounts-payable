<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CreateController extends Controller
{
    /**
     * Show the view for the Create page
     *
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request):Response
    {
        $invoices = Invoice::all();
        $payments = Payment::all();

        return Inertia::render('create', compact('invoices', 'payments'));
    }
}
