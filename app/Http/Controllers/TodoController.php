<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = auth()->user()->todos()->orderBy('created_at', 'asc')->paginate(20);

        return response()->json($todos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $content = $request->get('content');

        if (empty($content)) {
            return response()->json([
                'errors' => [
                    'content' => [
                        'content is required'
                    ]
                ]
            ], 422);
        }

        $todo = auth()->user()->todos()->create([
            'content' => $content
        ]);

        return response()->json($todo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Todo $todo
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Todo $todo)
    {
        $content = $request->get('content');
        $completed_at = $request->get('completed_at', null);

        $updates = [
            'completed_at' => $completed_at
        ];

        if (!empty($content)) {
            $updates['content'] = $content;
        }

        $todo->update($updates);

        return response()->json($todo->fresh());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Todo $todo
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->json([
            'result' => 'todo deleted!'
        ]);
    }
}
