<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
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
        $invocies = Invoice::all();
        $payments = Payment::all();

        return Inertia::render('dashboard', compact('invocies', 'payments'));
    }
}
