<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Auth;
use App\Helpers\Conversation;
use Illuminate\Http\Request;
use App\User;

class FriendsController extends ApiController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, User $user) {

        if ($request->has('name') && !empty($request->name)) {
            $friends = User::join('profiles', 'profiles.user_id', '=', 'users.id')->select('users.*','profiles.avater')->where('users.id', "!=", Auth::id())->where('name', 'LIKE', '%' . $request->name . '%')->get();
        }else{

            $friends = User::join('profiles', 'profiles.user_id', '=', 'users.id')->select('users.*','profiles.avater')->where('users.id', "!=", Auth::id())->get();
        }
  
      return $this->respond($friends);
    }


}
