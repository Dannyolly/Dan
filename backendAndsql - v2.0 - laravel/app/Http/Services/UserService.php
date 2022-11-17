<?php

namespace App\Http\Services;


use App\Models\VO\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Facade;
use phpDocumentor\Reflection\Types\True_;

class UserService implements UserServiceInterface {
    public  function getAllUsers(): array
    {
        return DB::table('users')->get()->toArray();

    }

    public  function searchUserById($id): Model|\Illuminate\Database\Eloquent\Collection|array|\App\Models\User|null
    {
        return \App\Models\User::find($id);
    }

    public function isUserExist($email): bool{

        return DB::table('users')->where('email',$email)->first() != null;
    }

    public function getUserByEmail($email)
    {
        return DB::table('users')->where('email',$email)->first();
    }

    public function updateUserPasswordByEmail($email,$password): int
    {
        return DB::update(
            "update users set password = ? where email =?",
            [$password,$email]
        );
    }

    public function getUserFds($id,$page,$pageSize): array{
        return DB::table('users as u')
            ->select(
                'u.id as id',
                'u.name as name',
                'u.email as email',
                'u.avatar as avatar',
                'u.background as background'
            )
            ->join('users_rel as ur','u.id','=','ur.friend_id')
            ->where('ur.user_id',$id)
            ->paginate(perPage: $pageSize, page: $page)
            ->items();
    }

    public function checkRel($user1Id , $user2Id): int
    {
        return  DB::table('users_rel')
                ->where('user_id',$user1Id,)
                ->where('friend_id',$user2Id)
                ->count();
    }

    public function getUserByIds($ids): array{
        return \App\Models\User::whereIn('id',$ids)->get()->toArray();
    }

    public function searchUserByWord($word): array
    {
        return DB::table('users as u')
            ->where('u.name','like','%'.$word.'%')
            ->get()->toArray();
    }
}
