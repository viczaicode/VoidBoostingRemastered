<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        return User::query()
            ->select(['user_id', 'nickname', 'email', 'role', 'created_at'])
            ->orderByDesc('created_at')
            ->get();
    }

    public function show($id)
    {
        return User::findOrFail($id);
    }

    public function destroy(Request $request, $id)
    {
        if ((int) $request->user()->user_id === (int) $id) {
            return response()->json([
                'message' => 'You cannot delete your own account.'
            ], 422);
        }

        User::destroy($id);

        return response()->json([
            "message" => "User deleted"
        ]);
    }

    public function updateRole(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'role' => ['required', 'integer', 'in:0,1,2'],
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->all()], 400);
        }

        $user = User::findOrFail($id);
        $user->role = (int) $request->role;
        $user->save();

        return response()->json([
            'user' => [
                'user_id' => $user->user_id,
                'nickname' => $user->nickname,
                'email' => $user->email,
                'role' => $user->role,
            ],
        ]);
    }

    public function updatePassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "password" => 'string|min:3|max:50'
        ]);
        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()->all()], 400);
        }
        $user = User::where("id", $id)->update([
            "password" => Hash::make($request->password),
        ]);
        return response()->json(["user" => $user]);
    }

}
