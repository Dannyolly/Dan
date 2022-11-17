<?php

namespace App\Listeners;

use App\Events\ForgotPasswordEvent;
use App\Events\RegisterEvent;
use App\Mail\UserRegister;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class UserEventSubscriber implements ShouldQueue {
    /**
     * 任务将被发送到的连接的名称。
     */
    public string $connection = 'redis';

    /**
     * 任务将被发送到的队列的名称。
     */
    public string $queue = 'listeners';

    /**
     * 处理用户注冊事件。
     * @param RegisterEvent $event
     */
    public function handleUserRegister(RegisterEvent $event) {
        $user = json_decode($event->userRegister->user);
        Log::notice('register a new user:'.$event->userRegister->user);
        Mail::to($user)->queue($event->userRegister);
    }

    /**
     * 处理用户登录事件。
     */
    public function handleUserLogin($event) {

    }

    public function handleUserLogout($event){

    }

    public function handleForgotPassword(ForgotPasswordEvent $event){
        $user = json_decode($event->forgotPassword->user);
        Log::notice('send a verified code to user:'.$event->forgotPassword->user);
        Mail::to($user)->queue($event->forgotPassword);
    }

    /**
     * 为订阅者注册侦听器。
     *
     * @param  \Illuminate\Events\Dispatcher  $events
     * @return array
     */
    public function subscribe($events)
    {
        return [
            RegisterEvent::class => 'handleUserRegister',
            ForgotPasswordEvent::class => 'handleForgotPassword'
        ];
    }
}
