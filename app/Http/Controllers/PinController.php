<?php

namespace App\Http\Controllers;

use App\Models\Pin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PinController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pinQuery = Pin::with(['creator', 'category'])->newQuery();

        if ($request->query('category_id')) {
            $pinQuery->where('category_id', $request->query('category_id'));
        }

        if ($request->query('category')) {
            $pinQuery->whereRelation('category', function ($query) use ($request) {
                $query->where('slug', $request->query('category'));
            });
        }

        $pins = $pinQuery->paginate($request->query('per_page', 20));

        return response($pins);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:120',
            'destination' => 'required|url',
            'image' => 'required|file|image',
            'category_id' => 'required|integer|exists:pin_categories,id'
        ]);

        $createParams = $request->only(['title', 'destination', 'category_id']);
        $createParams['posted_by'] = auth()->id();
        $createParams['image'] = $request->file('image')->store('pin_images', 'public');
        $pin = Pin::create($createParams);
        $pin->load('category', 'creator');

        return response($pin, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Pin $pin
     * @return \Illuminate\Http\Response
     */
    public function show(Pin $pin)
    {
        return response($pin->load(['creator', 'category']));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Pin $pin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pin $pin)
    {
        $request->validate([
            'title' => 'string|max:120',
            'destination' => 'url',
            'image' => 'file|image',
            'category_id' => 'integer|exists:pin_categories,id'
        ]);

        $updates = [];
        $updatable = ['title', 'destination'];

        foreach ($updatable as $property) {
            if ($request->has($property)) {
                $updates[$property] = $request->get($property);
            }
        }

        Log::info($request->keys());
        Log::info('testing');
        Log::warning($request->has('image') ? 'true' : 'false');
        if ($request->has('image')) {
            Log::info('request has image');
            $updates['image'] = $request->file('image')->store('pin_images', 'public');
        }

        $pin->update($updates);

        return response($pin->fresh());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Pin $pin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pin $pin)
    {
        if (auth()->id() == $pin->posted_by) {
            $pin->delete();

            return response([
                'result' => 'success!',
                'message' => 'pin deleted'
            ]);
        }

        return response([
            'result' => 'failure',
            'message' => 'you must be the owner of the pin to delete it'
        ]);
    }

    public function save(Request $request, Pin $pin)
    {
        auth()->user()->savedPins()->attach($pin->id);

        return response([
            'result' => 'saved pin'
        ]);
    }

    public function unsave(Request $request, Pin $pin)
    {
        auth()->user()->savedPins()->detach($pin->id);

        return response([
            'result' => 'unsafed pins'
        ]);
    }

    public function fetchSaved(Request $request)
    {
        $pins = $request->user()->savedPins()->get();

        return response($pins);
    }
}
