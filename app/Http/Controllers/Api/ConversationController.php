<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Support\Facades\Auth;
use App\Helpers\Conversation;
use Illuminate\Http\Request;
use App\Events\MessageSent;
use App\Models\Message;
use App\User;

class ConversationController extends ApiController
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
    public function index(User $user) {
      $conversation = new Conversation(Auth::user(), $user);

      return $this->respond($conversation->messages(40, true));
    }

    public function store(Request $request, User $user) {

      if(!$user) return $this->respondUnprocessable();

      $request->validate([
        'message' => ['required', 'max:180']
      ]);

      $message = [
        'sender_id' => Auth::id(),
        'recipient_id' => $user->id,
        'body' => $request->message
      ];

      $message = Message::create($message);

      event(new MessageSent($message));
    }

    public function last(User $user = null) {
      if($user) {
          $conversation = new Conversation(Auth::user(), $user);
          return $this->respond($conversation->lastMessage());
      }

      $messages = User::where('id', '!=', Auth::id())->get()->mapWithKeys(function($user) {
        $conversation = new Conversation(Auth::user(), $user);
        return [$user->id => $conversation->lastMessage()];
      });

      return $this->respond($messages);
    }
}
