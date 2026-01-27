<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\EditItemRequest;
use App\Http\Requests\StoreItemRequest;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Get data for items
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request):JsonResponse {
        return response()->json(['data' => Item::all()]);
    }

    /**
     * Store a newly created item
     *
     * @param StoreItemRequest $request
     *
     * @return mixed
     */
    public function store(StoreItemRequest $request)
    {
        return (Item::create($request->validated()))->toJSON();
    }

    /**
     * Get data for items modal
     *
     * @param Request $request
     * @param Item $item
     *
     * @return mixed
     */
    public function show(Request $request, Item $item) {
        return $item->toJSON();
    }

    /**
     * Update an items and return success or failure
     *
     * @param EditItemRequest $request
     * @param Item $item
     *
     * @return JsonResponse
     */
    public function edit(EditItemRequest $request, Item $item):JsonResponse {
        return response()->json([
            'success' => $item->update($request->validated()),
            'item' => $item,
        ]);
    }

    /**
     * Remove the specified Item
     *
     * @param Item $item
     * @return mixed
     */
    public function destroy(Item $item)
    {
        $success = $item->delete() ? true : false;
        $message = ($success) ? 'Item deleted successfully.' : 'Task failed. Item not deleted.';

        return response()->json([
            'success' => $success,
            'message' => $message
        ]);
    }

    /**
     * Submit an item and return success or failure
     *
     * @param Request $request
     * @param Item $item
     *
     * @return bool
     */
    public function submit(Request $request, Item $item):bool {
        return true;
    }
}
