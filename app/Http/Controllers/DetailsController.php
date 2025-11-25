<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DetailsController extends Controller
{
    /**
     * Show the view for the Invoice Details page
     *
     * @param Request $request
     * @param Invoice $invoice
     *
     * @return Response
     */
    public function index(Request $request, Invoice $invoice):Response
    {
        return Inertia::render('details', compact('invoice'));
    }

    /**
     * Process the invoice update from Invoice Details page
     *
     * @param Request $request
     * @param Invoice $invoice
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Invoice $invoice)
    {
        $validatedData = $request->validate([
            'customer_name' => 'required|string|max:255',
        ]);

        $invoice->update($validatedData);

//        return response()->json($invoice->save());

        return redirect()->route('update');
    }
}
