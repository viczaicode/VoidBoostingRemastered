<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\Admin;
use App\Http\Middleware\Booster;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

//BÁRKI

Route::get('/services', [ServiceController::class,'index']);
Route::get('/services/{id}', [ServiceController::class,'show']);

//BEJELENTKEZETT FELH.
Route::middleware(['auth:sanctum'])
->group(function () {
    Route::post('/orders', [OrderController::class,'store']);
    Route::get('/my-orders', [OrderController::class,'myOrders']);
});


//BOOSTER
Route::middleware(['auth:sanctum', Booster::class])
->group(function () {
    Route::get('/booster/orders', [OrderController::class,'boosterOrders']);
    Route::post('/booster/orders/{id}/assign', [OrderController::class,'assignToBooster']);
    Route::patch('/booster/orders/{id}/status', [OrderController::class,'updateBoosterStatus']);
});


//ADMIN
Route::middleware(['auth:sanctum', Admin::class])
->group(function () {
    Route::get('/orders', [OrderController::class,'index']);
    Route::get('/orders/{id}', [OrderController::class,'show']);
    Route::patch('/orders/{id}', [OrderController::class,'adminUpdate']);
    Route::delete('/orders/{id}', [OrderController::class,'destroy']);

    Route::get('/users', [UserController::class, 'index']);
    Route::patch('/users/{id}/role', [UserController::class, 'updateRole']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::post('/services', [ServiceController::class,'store']);
    Route::delete('/services/{id}', [ServiceController::class,'destroy']);
});



