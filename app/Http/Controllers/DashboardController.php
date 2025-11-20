<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\View\View;

class DashboardController extends Controller
{
    /**
     * Show the view for the Dashboard page
     *
     * @param Request $request
     *
     * @return View
     */
    public function index(Request $request):View
    {
        $invocies = Invoice::all();
        $payments = Payment::all();

        return view('dashboard', compact('invocies', 'payments'));
    }
}
