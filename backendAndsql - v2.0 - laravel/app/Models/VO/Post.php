<?php

namespace App\Models\VO;

use App\Models\User;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;

//  post
class Post implements Arrayable{

    public int $user_id; //int
    public string $name; //String
    public string $avatar; //String
    public string $background;
    public int $id; //int
    public string $title; //String
    public string $content; //String
    public string $images; //String
    public int $like; //int
    public int $comments;
    public string $created_at;


    public function toArray(): array
    {
        return [
            'user_id' => $this->user_id,
            'name' => $this->name,
            'avatar' => $this->avatar,
            'background' => $this->background,
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            'images' => $this->images,
            'like' => $this->like,
            'comments' => $this->comments,
            'created_at' => $this->created_at
        ];
    }
}

