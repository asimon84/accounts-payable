<?php

namespace App\Http\Controllers;

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
        return Inertia::render('invoices', []);
    }
}
