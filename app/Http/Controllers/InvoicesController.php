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

    /**
     * Show the view for the Create Invoice page
     *
     * @param Request $request
     *
     * @return Response
     */
    public function create(Request $request):Response
    {
        return Inertia::render('create-invoice', []);
    }

    /**
     * Show the view for the Edit Invoice page
     *
     * @param Request $request
     * @param int $id
     *
     * @return Response
     */
    public function show(Request $request, int $id) {

        $invoice = Invoice::with('invoiceItems')->find($id);

        return Inertia::render('invoice', compact('invoice'));
    }
}
