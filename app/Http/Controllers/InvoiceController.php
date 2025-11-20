<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;

class InvoiceController extends Controller
{
    /**
     * Get data for records table on Dashboard page
     *
     * @param Request $request
     *
     * @return JsonResponse
     */
    public function index(Request $request):JsonResponse {
        return DataTables::of(Record::all())
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
     * Get data for record modal on Dashboard page
     *
     * @param Request $request
     * @param int $id
     *
     * @return mixed
     */
    public function show(Request $request, int $id) {
        return Record::find($id)->toJSON();
    }

    /**
     * Update a record and return success or failure
     *
     * @param Request $request
     * @param int $id
     *
     * @return bool
     */
    public function edit(Request $request, int $id):bool {
        $record = Record::find($id);

        $record->string = $request->input('string');
        $record->text = $request->input('text');
        $record->json = $request->input('json');
        $record->boolean = filter_var($request->input('boolean'), FILTER_VALIDATE_BOOLEAN);
        $record->integer = (int) $request->input('integer');
        $record->float = (float) $request->input('float');

        return $record->save();
    }

    /**
     * Delete a record and return success or failure
     *
     * @param Request $request
     * @param int $id
     *
     * @return bool
     */
    public function delete(Request $request, int $id):bool {
        return (bool) Record::destroy($id);
    }
}
