<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        return Order::with(['service','buyer','booster'])->get();
    }

    public function store(Request $request)
    {
        $order = Order::create([
            'service_id' => $request->service_id,
            'buyer_id' => $request->buyer_id,
            'booster_id' => $request->booster_id,
            'rank_from' => $request->rank_from,
            'rank_to' => $request->rank_to,
            'price' => $request->price
        ]);

        return response()->json($order);
    }

    public function show($id)
    {
        return Order::with(['service','buyer','booster'])->findOrFail($id);
    }

    public function destroy($id)
    {
        Order::destroy($id);

        return response()->json([
            "message" => "Order deleted"
        ]);
    }
}
