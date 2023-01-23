<?php

use App\Http\Controllers\PinCategoryController;
use App\Http\Controllers\PinController;
use App\Http\Controllers\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])
    ->prefix('/todos')
    ->controller(TodoController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::put('/{todo}', 'update');
        Route::delete('/{todo}', 'destroy');
    });

Route::middleware(['auth:sanctum'])
    ->prefix('/pins')
    ->controller(PinController::class)
    ->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::patch('/{pin}', 'update');
        Route::delete('/{pin}', 'destroy');
        Route::post('/{pin}/save', 'save');
        Route::post('/{pin}/unsave', 'unsave');
        Route::get('/saved', 'fetchSaved');
    });

Route::middleware(['auth:sanctum'])
    ->prefix('/pin_categories')
    ->controller(PinCategoryController::class)
    ->group(function() {
       Route::get('/', 'index');
    });
