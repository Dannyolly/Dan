<?php

namespace App\Models\VO;


use App\Models\User;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;

// Notification - post liked commented
class PostNotification implements Arrayable{

    public int $user_id; //int
    public string $name; //String
    public string $avatar; //String
    public string $background;
    public int $post_id; //int
    public string $comment_content; //String
    public string $post_content; //String
    public string $images;
    public string $created_at;
    public int $comments;
    public int $like;
    public int $id;

    /**
     * @param int $user_id
     * @param string $name
     * @param string $avatar
     * @param string $background
     * @param int $post_id
     * @param string $comment_content
     * @param string $post_content
     * @param string $images
     * @param string $created_at
     * @param int $comments
     * @param int $like
     * @param int $id
     */
    public function __construct(int $user_id, string $name, string $avatar, string $background, int $post_id, string $comment_content, string $post_content, string $images, string $created_at, int $comments, int $like, int $id)
    {
        $this->user_id = $user_id;
        $this->name = $name;
        $this->avatar = $avatar;
        $this->background = $background;
        $this->post_id = $post_id;
        $this->comment_content = $comment_content;
        $this->post_content = $post_content;
        $this->images = $images;
        $this->created_at = $created_at;
        $this->comments = $comments;
        $this->like = $like;
        $this->id = $id;
    }


    public function toArray(): array
    {
        return [
            'user_id' => $this->user_id,
            'name' => $this->name,
            'avatar' => $this->avatar,
            'background' => $this->background,
            'post_id' => $this->post_id,
            'post_content' => $this->post_content,
            'comment_content' => $this->comment_content,
            'post_images' => $this->images,
            'created_at' => $this->created_at,
            'comments' => $this->comments,
            'like' => $this->like,
            'id' => $this->id
        ];
    }
}


