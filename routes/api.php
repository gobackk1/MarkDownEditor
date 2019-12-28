<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['api']],function(){
  Route::resource('items','ApiController',['except'=>['create','edit']]);
  Route::post('create/category', 'CategoryController@create');
  Route::post('update/category', 'CategoryController@update');
  Route::post('delete/category', 'CategoryController@delete');
  Route::post('create/memo', 'MemoController@create');
  Route::post('update/memo', 'MemoController@update');
  Route::post('delete/memo', 'MemoController@delete');
  Route::post('test', 'MemoController@test');
});
