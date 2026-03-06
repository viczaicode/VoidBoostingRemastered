<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return Service::all();
    }

    public function show($id)
    {
        return Service::findOrFail($id);
    }

    public function store(Request $request)
    {
        $service = Service::create([
            'title' => $request->title,
            'description' => $request->description,
            'photo' => $request->photo,
            'status' => 'active'
        ]);

        return response()->json($service);
    }

    public function destroy($id)
    {
        Service::destroy($id);

        return response()->json([
            "message" => "Service deleted"
        ]);
    }
}
