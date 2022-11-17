<?php

namespace App\Http\Services;


use App\Models\AddRequest;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Facade;

class AddRequestService {

    public function insertAddRequest(AddRequest $addRequest): bool
    {
        return DB::table('add_request')
            ->insert([
                'from_id' =>$addRequest->from_id,
                'to_id' =>  $addRequest->to_id,
                'content' => $addRequest->content,
                'created_at' => $addRequest->created_at
            ]);
    }

    public function acceptedRequest($ids): int{
        return AddRequest::destroy($ids);
    }

    public function getAddRequestByUserId($userId): array{
        return DB::table('add_request as ar')
                ->select(
                    'ar.id as id',
                    'u.avatar as avatar',
                    'u.name as name',
                    'ar.content as content',
                    'ar.from_id as from_id',
                    'ar.to_id as to_id',
                    'ar.created_at as created_at'
                )
                ->join('users as u','ar.from_id','=','u.id')
                ->where("to_id",$userId)
                ->where('status','!=',1)
                ->get()
                ->toArray();
    }
}
