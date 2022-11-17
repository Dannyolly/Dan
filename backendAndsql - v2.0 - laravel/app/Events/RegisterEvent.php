<?php

namespace App\Events;

use App\Listeners\UserEventSubscriber;
use App\Mail\UserRegister;
use App\Models\VO\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RegisterEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public UserRegister $userRegister;
    /**
     * Create a new event instance.
     */
    public function __construct($user)
    {
        $this->userRegister  = $user;
    }

}
