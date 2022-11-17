<?php

namespace App\Http\Services;


use App\Models\Chat;
use App\Models\Post;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Facade;

class ChatService  {
    /**
     * @param Chat $chat
     * @return int MsgId
     */
    function insertChatMsg(Chat $chat): int{
        return DB::table('chats')
            ->insertGetId(
                $chat->toArray()
            );
    }

    function getMsgByUserId($userId): array
    {
        return DB::table('chats as c')
            ->select(
                'c.id as id',
                'c.user_id as user_id',
                'c.to_id as to_id',
                'c.message as message',
                'c.url  as url',
                'c.created_at as created_at',
                'u.name as name',
                'u.avatar as avatar'
            )
            ->join('users as u','u.id','=','c.user_id')
            ->where('to_id',$userId)
            ->get()->toArray();
    }

    function signMsg($ids): int{
        return Chat::destroy($ids);
    }

}
