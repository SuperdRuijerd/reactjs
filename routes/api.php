<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProductController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/products/list', [ProductController::class, 'list']);
Route::post('/products/insert', [ProductController::class, 'insert']);
Route::get('/products/edit/{id}', [ProductController::class, 'edit']);
Route::post('/products/update', [ProductController::class, 'update']);
Route::post('/products/delete', [ProductController::class, 'delete']);
