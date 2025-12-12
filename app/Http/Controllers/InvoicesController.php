<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoicesController extends Controller
{
    /**
     * Show the view for the Invoices page
     *
     * @param Request $request
     * @param Invoice $invoice
     *
     * @return Response
     */
    public function index(Request $request, Invoice $invoice):Response
    {
        return Inertia::render('invoices', compact('invoice'));
    }
}
