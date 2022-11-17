<?php

namespace App\Http\Services;


use App\Models\Post;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Facade;

class PostService  {

    public  function getAllPosts(): array
    {
        return DB::table('posts')->get()->toArray();
    }

    public  function searchPostById($id): array{
        return DB::select(
            "select * from posts where id = ?",[$id]
        );
    }

    public function isPostExist($email): bool{
        return DB::table('posts')->where('email',$email)->first() != null;
    }

    /**
     * @return \App\Models\VO\Post[]
     */
    public function  getPostComments($postId,$pageSize,$page): array
    {
        return DB::table('post_comment_rel as pr')
                    ->select(

                        'c.content as content',
                        'c.user_id as user_id',
                        'c.like as like',
                        'c.created_at as created_at',
                        'pr.post_id as post_id',
                        'pr.comment_id as  comment_id',
                        'pr.id as rel_id',
                        'u.name as name',
                        'u.avatar as avatar',
                        'u.background as background'
                    )
                    ->where('pr.post_id',$postId)
                    ->join('comments as c','c.id','=','pr.comment_id')
                    ->join('users as u','c.user_id','=','u.id')
                    ->orderByDesc('c.id')
                    ->simplePaginate(perPage:  $pageSize, page: $page)->items();
    }

    public function insertComment($postId,$content,$userId): bool
    {
        $id = DB::table('comments')
                ->insertGetId([
                    'content'=> $content,
                    'user_id' => $userId,
                    'created_at' => now()
                ]);
        return DB::table('post_comment_rel')->insert([
            'post_id' =>$postId,
            'comment_id' => $id
        ]);
    }

    public function insertPost($title,$content,$path,$user_id): int
    {

        return DB::table('posts')
            ->insertGetId([
                'content'=> $content,
                'user_id' => $user_id,
                'title' => $title,
                'images' => $path,
                'created_at' => now(),
                'updated_at' => now()
            ]);
    }

    public function updatePostLike($postId): int
    {
            return DB::table('posts')
                ->where('id',$postId)
                ->increment('like');
    }

    public function cancelPostLike($postId): int{
        return DB::table('posts')
            ->where('id',$postId)
            ->decrement('like');
    }

    public function updatePostComment($postId): int
    {
        return DB::table('posts')
            ->where('id',$postId)
            ->increment('comments');
    }

    public function getUnReceivePost($userId,$lastPostId,$page = 1,$pageSize = 5): array
    {
        return DB::table('users as u')
                ->select(
                    'u.id as user_id',
                    'u.name    as  name',
                    'u.avatar  as  avatar',
                    'u.background as background',
                    'p.id      as  id',
                    'p.title   as  title',
                    'p.content as  content',
                    'p.images  as  images',
                    'p.like    as  like',
                    'p.comments as comments',
                    'p.created_at as created_at'
                )
                ->distinct()
                ->join('users_rel as ur','u.id','=','ur.friend_id')
                ->join('posts as p','p.user_id','=','ur.friend_id')
                ->where('ur.user_id',$userId)
                ->where('u.id','=',$userId,'or')
                ->where('p.id','>',$lastPostId)
                ->orderByDesc('p.id')
                ->paginate($pageSize,['*'],'page',$page)
                ->items();

    }

    /**
     * @return \App\Models\VO\Post[]
     */
    public function getUserPosts($userId,$lastPostId,$page = 1,$pageSize = 5): array
    {

        return DB::table('posts as p')
            ->select(
                'u.id as user_id',
                'u.name    as  name',
                'u.avatar  as  avatar',
                'u.background as background',
                'p.id      as  id',
                'p.title   as  title',
                'p.content as  content',
                'p.images  as  images',
                'p.like    as  like',
                'p.comments as comments',
                'p.created_at as created_at'
            )
            ->join('users as u','u.id','=','p.user_id')
            ->where('p.user_id',$userId)
            ->orderByDesc('p.id')
            ->where('p.id','>',$lastPostId)
            ->paginate($pageSize,['*'],'page',$page)
            ->items();

    }

    public function getPostById($postId): Post|null
    {
        return  Post::find($postId);
    }
}
