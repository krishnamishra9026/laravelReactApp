<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
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

// Front End View Routes
Route::get('/', function () { return view('welcome'); });
Route::get('/CompanyInfo', function () { return view('welcome'); });
Route::get('/DriveWithUs', function () { return view('welcome'); });
Route::get('/HowitWorks', function () { return view('welcome'); });
Route::get('/customer/transactions', function () { return view('customer'); });
Route::get('/customer/bookings', function () { return view('customer'); });
Route::get('/customer/wallet', function () { return view('customer'); });
Route::get('/customer/profile', function () { return view('customer'); });
Route::get('/customer/notifications', function () { return view('customer'); });
Route::get('/customer/profile/edit', function () { return view('customer'); });


Route::get('/admin/transactions', function () { return view('admin'); });
Route::get('/admin/bookings', function () { return view('admin'); });
Route::get('/admin/users', function () { return view('admin'); });
Route::get('/admin/user/{id}', function () { return view('admin'); });
Route::get('/admin/chat', function () { return view('admin'); });
Route::get('/admin/wallet', function () { return view('admin'); });
Route::get('/admin/profile', function () { return view('admin'); });
Route::get('/admin/notifications', function () { return view('admin'); }	);
Route::get('/admin/profile/edit', function () { return view('admin'); });


Route::get('/agent/transactions', function () { return view('agent'); });
Route::get('/agent/bookings', function () { return view('agent'); });
Route::get('/agent/users', function () { return view('agent'); });
Route::get('/agent/user/{id}', function () { return view('agent'); });
Route::get('/agent/wallet', function () { return view('agent'); });
Route::get('/agent/profile', function () { return view('agent'); });
Route::get('/agent/notifications', function () { return view('agent'); }	);
Route::get('/agent/profile/edit', function () { return view('agent'); });



// Admin Dashboard View Route
Route::group(['middleware' => 'App\Http\Middleware\Admin'], function()
{
Route::get('/admin', 'HomeController@admin')->name('adminhome');
});

// Agent Dashboard View Route
Route::group(['middleware' => 'App\Http\Middleware\Agent'], function()
{
Route::get('/agent', 'HomeController@agent')->name('agenthome');
});

// Customer Dashboard View Route
Route::group(['middleware' => 'App\Http\Middleware\Customer'], function()
{
Route::get('/customer', 'HomeController@customer')->name('customerhome');
Route::get('/query/add', 'HomeController@booknow')->name('booknow');
});

Auth::routes();

Route::get('/logout', 'HomeController@logout');



Route::prefix('api')->group(function() {
  // This routing can be better
  Route::get('/conversation/last', 'Api\ConversationController@last');
  Route::get('/conversation/last/{user}', 'Api\ConversationController@last');

  Route::get('/conversation/{user}', 'Api\ConversationController@index');
  Route::post('/conversation/{user}', 'Api\ConversationController@store');
  Route::get('/friends', 'Api\FriendsController@index');

  Route::get('/user', function() {
    return Auth::user();
  });
});




