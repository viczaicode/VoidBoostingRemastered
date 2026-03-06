<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
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
    //Route::get('/user', function (Request $request) {
        //return $request->user();
    //});
    // Kijelentkezés útvonal
    //Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
});


//BOOSTER
Route::middleware(['auth:sanctum', Booster::class])
->group(function () {
    Route::get('/orders', [OrderController::class,'index']);
    Route::get('/orders/{id}', [OrderController::class,'show']);
});


//ADMIN
Route::middleware(['auth:sanctum', Admin::class])
->group(function () {
    Route::get('/users', [UserController::class, 'index']);

    Route::post('/orders', [OrderController::class,'store']);
    Route::post('/services', [ServiceController::class,'store']);

    Route::delete('/orders/{id}', [OrderController::class,'destroy']);
    Route::delete('/services/{id}', [ServiceController::class,'destroy']);
});



