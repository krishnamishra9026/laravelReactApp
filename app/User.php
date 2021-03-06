<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Bavix\Wallet\Traits\HasWallet;
use Bavix\Wallet\Interfaces\Wallet;

class User extends Authenticatable implements Wallet
{
    use Notifiable;
    use HasWallet;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','role','phone'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    
    public function sentMessages() {
      return $this->hasMany('App\Models\Message', 'sender_id');
    }

    public function receivedMessages() {
      return $this->hasMany('App\Models\Message', 'recipient_id');
    }
}
