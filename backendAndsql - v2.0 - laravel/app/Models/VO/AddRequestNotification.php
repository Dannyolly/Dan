<?php

namespace App\Models\VO;

use App\Models\User;
// Notification - post liked commented
class AddRequestNotification{

    public string $content;
    public string $created_at;
    public User   $user;

    /**
     * @param string $content
     * @param string $created_at
     * @param User $user
     */
    public function __construct(string $content, string $created_at, User $user)
    {
        $this->content = $content;
        $this->created_at = $created_at;
        $this->user = $user;
    }

    public function toArray(): array
    {
        return [
            'created_at' => $this->created_at,
            'content' => $this->content,
            'user' => $this->user->toArray(),
        ];
    }

}
