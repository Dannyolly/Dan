<?php

namespace App\Http\Controllers\Api;


use App\Enums\InformType;
use App\Http\Services\AddRequestService;
use App\Http\Services\UserService;
use App\Models\AddRequest;
use App\Models\Message;
use App\Models\Notification;
use App\Models\User;
use App\Models\VO\PostNotification;
use App\Response\ApiResponse;
use App\Utils\RequestHelper;
use Illuminate\Console\View\Components\Info;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends ApiController {

    protected AddRequestService | null $addRequestService;

    protected UserController | null $userController;
    /**
     * @return void
     */
    public function __construct(
        AddRequestService|null $addRequestService,
        UserController|null $userController
    ){
        $this->addRequestService= $addRequestService;
        $this->userController = $userController;
        //$this->middleware('auth:api', ['except' => ['uploader']]);
    }
    // --- addRequest
    public function acceptRequest(Request $request): JsonResponse{
        $ids = json_decode($request->get('ids'));
        $status = $this->addRequestService->acceptedRequest($ids);
        return ApiResponse::createJSON(
            $status?'OK':"WRONG",
            'accepted'
        );
    }

    public function getAllAddRequest(Request $request): JsonResponse{
        $userId = $request->get('userId');
        return ApiResponse::createJSON(
            'OK',
            $this->addRequestService->getAddRequestByUserId($userId)
        );
    }

    // --- post

    public function getAllNotification(Request $request): JsonResponse
    {
        // include someone comment , like in your post
        $userId = $request->get('userId');
        $lastId = $request->get('lastId');
        \Log::notice($lastId);
        $res =  DB::select(
            'select
                n.content comment_content,
                p.id as post_id,
                n.id as id,
                p.content as post_content,
                p.images as images,
                p.`like` as `like`,
                p.comments as comments,
                u.id as user_id,
                u.name,
                u.avatar,
                n.created_at as created_at
                from laravel.notification n
                join posts p on p.id = n.post_id
                join users u on n.from_id = u.id
                where n.to_id = ? and n.id > ?
                order by n.id desc
                '
            ,
            [$userId,$lastId]
        );
        return ApiResponse::createJSON(
            'OK',
            $res
        );
    }

    /**
     * @return PostNotification
     */
    public function getNotificationByNotifyId($notifyId):mixed
    {
        return DB::selectOne(
            'select
                n.content comment_content,
                p.id as post_id,
                n.id as id,
                p.content as post_content,
                p.images as images,
                p.`like` as `like`,
                p.comments as comments,
                u.id as user_id,
                u.name,
                u.avatar,
                u.background,
                n.created_at as created_at
                from laravel.notification n
                join posts p on p.id = n.post_id
                join users u on n.from_id = u.id
                where n.id = ?
                ',[$notifyId]
        );
    }

    public function notifyUser($fromId , $toId,int $type,$postId,$message,$save = false):int|false{
        $user = User::find($fromId);

        if(is_null($user)){
            return false;
        }
        switch ($type){
//            case InformType::COMMENT:
//                $content = $user->name.' commented in your post just now';
//                break;
            case  InformType::LIKE:
                $message = $user->name.' Liked your post just now';
                break;
            case InformType::SUBSCRIBE:
                $message = $user->name.' subscribed you just now';
                break;
            case InformType::PUBLISH_POST:
                $message = $user->name.' publish new Post';
        }

        $msg = new Notification(
            $message,
            $fromId,
            $toId,
            $type,
            $postId,
        );
        return DB::table('notification')
            ->insertGetId([
                'content' => $msg->content,
                'from_id' => $msg->from_id,
                'to_id' => $msg->to_id,
                'type' =>  $msg->type,
                'post_id' => $msg->post_id,
                'created_at' => now()
            ]);
    }

    public function signNotification(Request $request): JsonResponse
    {
        $ids = json_decode($request->get('ids'));
        if(is_null($ids)){
            return ApiResponse::createJSON(
                "WRONG",
                    "MISS The ids"
            );
        }
        $status = Notification::destroy($ids);
        return ApiResponse::createJSON(
            "OK",
                [
                    'status' => $status
                ]
        );
    }

    public function sendFollowNotification(Request $request): JsonResponse
    {
        [$from_id , $to_id ] = RequestHelper::getParams(['fromId','toId'],$request);
        $this->userController->follow($from_id,$to_id);
        return ApiResponse::createJSON(
            'OK',
            ['status' => $this->addRequestService->insertAddRequest(
                new AddRequest([
                    'from_id' => $from_id,
                    'to_id' => $to_id,
                    'content' => '',
                    'created_at' => now()
                ])
            )]
        );
    }

}
