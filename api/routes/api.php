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
Route::group(['middleware' => ['cors']], function () {
   Route::get('hola', 'Controller@prueba2');

   Route::get('archivos/index','Api\ArchivosController@index')->name('archivos.index');
   Route::get('archivos/create','Api\ArchivosController@create')->name('archivos.create');
});
Route::match(['post', 'options'], "login", "Api\AuthController@login")->middleware("cors");
Route::match(['post', 'options'], "register", "Api\AuthController@register")->middleware("cors");

//registro de archivos
	Route::match(['post', 'options'], "archivos/registro", "Api\ArchivosController@store")->name('archivos.store')->middleware("cors");