<?php

namespace App\Events;

use App\Listeners\UserEventSubscriber;
use App\Mail\ForgotPassword;
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

class ForgotPasswordEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public ForgotPassword $forgotPassword;
    /**
     * Create a new event instance.
     */
    public function __construct($user)
    {
        $this->forgotPassword  = $user;
    }

}
