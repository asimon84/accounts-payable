<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class ItemController extends Controller
{
    /**
     * Get data for items table
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request):JsonResponse {
        return DataTables::of(Item::all())
            ->addIndexColumn()
            ->addColumn('action', function($row){
                $buttons = '<div style="width: 130px;">';

                $buttons .= '<button type="button" class="btn btn-info view-record" data-bs-toggle="modal" data-bs-target="#recordModal" data-id='.$row->id.'><i class="bi bi-search"></i></button>';
                $buttons .= '<button type="button" class="btn btn-success edit-record" data-bs-toggle="modal" data-bs-target="#recordModal" data-id='.$row->id.'><i class="bi bi-pencil"></i></button>';
                $buttons .= '<button type="button" class="btn btn-danger delete-record" data-id='.$row->id.'><i class="bi bi-trash"></i></button>';

                $buttons .= '</div>';

                return $buttons;
            })
            ->rawColumns(['action'])
            ->make(true);
    }

    /**
     * Get data for items modal
     *
     * @param Request $request
     * @param int $id
     *
     * @return mixed
     */
    public function show(Request $request, int $id) {
        return Item::find($id)->toJSON();
    }

    /**
     * Update an item and return success or failure
     *
     * @param Request $request
     * @param int $id
     *
     * @return bool
     */
    public function edit(Request $request, int $id):bool {
        $record = Item::find($id);

        $record->string = $request->input('string');
        $record->text = $request->input('text');
        $record->json = $request->input('json');
        $record->boolean = filter_var($request->input('boolean'), FILTER_VALIDATE_BOOLEAN);
        $record->integer = (int) $request->input('integer');
        $record->float = (float) $request->input('float');

        return $record->save();
    }

    /**
     * Delete an item and return success or failure
     *
     * @param Request $request
     * @param int $id
     *
     * @return bool
     */
    public function delete(Request $request, int $id):bool {
        return (bool) Item::destroy($id);
    }
}
