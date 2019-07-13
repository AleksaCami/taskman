<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});


// Wildcard ruta, ovde se renderuje React aplikacija pod jednim divom, u jednom blade.php fajlu
Route::view('/{path?}', 'app');
