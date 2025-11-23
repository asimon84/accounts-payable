<?php

namespace App\Http\Controllers;

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
        return Inertia::render('create', []);
    }
}
