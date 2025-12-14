<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ItemsController extends Controller
{
    /**
     * Show the view for the Items page
     *
     * @param Request $request
     *
     * @return Response
     */
    public function index(Request $request):Response
    {
        return Inertia::render('items', []);
    }

    /**
     * Show the view for the Create Item page
     *
     * @param Request $request
     *
     * @return Response
     */
    public function create(Request $request):Response
    {
        return Inertia::render('create-item', []);
    }

    /**
     * Show the view for the Edit Item page
     *
     * @param Request $request
     * @param Item $item
     *
     * @return Response
     */
    public function show(Request $request, Item $item):Response
    {
        return Inertia::render('item', compact('item'));
    }
}
