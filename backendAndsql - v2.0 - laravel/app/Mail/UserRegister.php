<?php

namespace App\Mail;

use App\Models\VO\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Nette\Utils\Random;

class UserRegister extends Mailable implements ShouldQueue{
    use Queueable, SerializesModels;

    public string $code;

    public string $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($code,$user)
    {
        $this->code = $code;
        $this->user = $user;
    }

    /**
     * 构建消息
     *
     * @return $this
     */
    public function build(): UserRegister
    {

        return $this->view('emails')
                    ->with([
                        'code' => $this->code
                    ]);
    }


}
