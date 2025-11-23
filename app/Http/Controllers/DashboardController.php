<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the view for the Dashboard page
     *
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request):Response
    {
        $invoices = Invoice::with(['invoiceItems'])->get();

        $count = $invoices->count();

        $unpaid = $invoices->where('paid', false)->count();

        $paid = $invoices->where('paid', true)->count();

        $amount = 0;

        return Inertia::render('dashboard', compact('count', 'unpaid', 'paid', 'amount'));
    }
}
