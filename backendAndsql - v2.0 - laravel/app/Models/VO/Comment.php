<?php

namespace App\Models\VO;

use Illuminate\Contracts\Support\Arrayable;

class Comment implements  Arrayable {

    public string $content; //String
    public int $user_id; //int
    public int $like; //int
    public string $created_at; //Date
    public int $post_id; //int
    public int $comment_id; //int
    public int $rel_id; //int
    public string $name; //String
    public string $avatar; //String
    public string $background;

     function toArray(): array
     {
        return [
              'content' => $this->content,
              'user_id' => $this->user_id,
              'like' => $this->like,
              'created_at'=> $this->created_at,
              'post_id' => $this->post_id,
              'comment_id' => $this->comment_id,
              'rel_id' => $this->rel_id,
              'name' => $this->name,
              'avatar' => $this->avatar,
               'background' => $this->background
        ];
    }
}
