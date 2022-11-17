<?php

namespace App\Http\Services;


use App\Models\VO\comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Facade;

class CommentService  {

    public  function getAllcomments(): array
    {
        return DB::table('comments')->get()->toArray();
    }

    public  function searchcommentById($id): array
    {
        return DB::select(
            "select * from comments where id = ?",[$id]
        );
    }

    public function iscommentExist($email): bool{
        return DB::table('comments')->where('email',$email)->first() != null;
    }

    public function updateCommentLike($commentId){
        return DB::table('comments')
            ->where('id',$commentId)
            ->increment('like');
    }

    public function cancelCommentLike($commentId){
        return DB::table('comments')
            ->where('id',$commentId)
            ->decrement('like');
    }
}
