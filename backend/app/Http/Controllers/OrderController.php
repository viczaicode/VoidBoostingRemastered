<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderController extends Controller
{
    public function index()
    {
        return Order::with(['service','buyer','booster'])->get();
    }

    public function myOrders(Request $request)
    {
        return Order::with(['service', 'buyer', 'booster'])
            ->where('buyer_id', $request->user()->user_id)
            ->latest('created_at')
            ->get();
    }

    public function boosterOrders(Request $request)
    {
        return Order::with(['service', 'buyer', 'booster'])
            ->where(function ($query) use ($request) {
                $query->whereNull('booster_id')
                    ->orWhere('booster_id', $request->user()->user_id);
            })
            ->latest('created_at')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_id' => ['required', 'exists:services,service_id'],
            'rank_from' => ['required', 'string', 'max:255'],
            'rank_to' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'order_details' => ['nullable', 'array'],
        ]);

        $order = Order::create([
            'service_id' => $validated['service_id'],
            'buyer_id' => $request->user()->user_id,
            'booster_id' => null,
            'rank_from' => $validated['rank_from'],
            'rank_to' => $validated['rank_to'],
            'price' => $validated['price'],
            'order_details' => $validated['order_details'] ?? null,
            'status' => 'pending',
        ]);

        return response()->json($order, 201);
    }

    public function assignToBooster(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        if ($order->booster_id !== null && $order->booster_id !== $request->user()->user_id) {
            return response()->json(['message' => 'This order is already assigned to another booster.'], 409);
        }

        $order->booster_id = $request->user()->user_id;

        if ($order->status === 'pending') {
            $order->status = 'in_progress';
        }

        $order->save();

        return response()->json($order->load(['service', 'buyer', 'booster']));
    }

    public function updateBoosterStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(['in_progress', 'completed', 'cancelled'])],
        ]);

        $order = Order::findOrFail($id);

        if ($order->booster_id !== $request->user()->user_id) {
            return response()->json(['message' => 'You can only update orders assigned to you.'], 403);
        }

        $order->status = $validated['status'];
        $order->save();

        return response()->json($order->load(['service', 'buyer', 'booster']));
    }

    public function adminUpdate(Request $request, $id)
    {
        $validated = $request->validate([
            'booster_id' => ['nullable', 'exists:users,user_id'],
            'status' => ['nullable', Rule::in(['pending', 'in_progress', 'completed', 'cancelled'])],
        ]);

        $order = Order::findOrFail($id);

        if (array_key_exists('booster_id', $validated)) {
            $order->booster_id = $validated['booster_id'];
        }

        if (array_key_exists('status', $validated)) {
            $order->status = $validated['status'];
        }

        $order->save();

        return response()->json($order->load(['service', 'buyer', 'booster']));
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
