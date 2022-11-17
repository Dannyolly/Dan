<?php
namespace App\Workerman\Handler;
use App\Enums\InformType;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserController;
use App\Http\Services\AddRequestService;
use App\Http\Services\PostService;
use App\Http\Services\UserService;
use App\Models\AddRequest;
use App\Models\Message;
use App\Models\Notification;
use App\Models\User;
use App\Models\VO\PostNotification;
use App\Response\ApiResponse;
use \GatewayWorker\Lib\Gateway;
use Illuminate\Auth\Access\Gate;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use Ramsey\Uuid\Uuid;

class NotificationHandler extends BaseHandler {


    public static function handleOthers(Message $message,$clientId){
        $controller = new NotificationController(null,null);
        $id = self::getClientIdByToIdAndCheckIsOnline($message->to_id);
        Log::notice('new notification:'.$message->mode.'-'.$message->post_id);
        if($id){
            $userService = new UserService();
            $postService = new PostService();
            $user = $userService->searchUserById($message->user_id);
            $post = $postService->getPostById($message->post_id);
            $message->extendFields = new PostNotification(
                $message->user_id,
                $user->name,
                $user->avatar,
                $user->background,
                $message->post_id,
                $message->message,
                $post->content,
                $post->images,
                $post->created_at,
                $post->comments,
                $post->like,
                -1,

            );
            self::send($message);
        }else{
            $suc =  $controller->notifyUser(
                $message->user_id ,
                $message->to_id,
                $message->mode,
                $message->post_id,
                $message->message,
                false
            );
        }
    }

    public static function handleAddRequest(Message $message,$clientId){
        $addRequestService = new AddRequestService();
        $userService = new UserService();
        $user = $userService->searchUserById($message->user_id);
        $addRequest = (new AddRequest())->setUp(
            $message->user_id,
            $message->to_id,
            $message->message
        );
        $message->extendFields = new PostNotification(
            $message->user_id,
            $user->name,
            $user->avatar,
            $user->background,
            $message->post_id,
            $message->message,
            '',
            '',
            now(),
            0,
            -1,
            -1,

        );
        $toClientId = self::getClientIdByToIdAndCheckIsOnline($message->to_id);
        if(!is_null($toClientId)){
            Gateway::sendToClient(
                $toClientId,
                ApiResponse::create('OK',$message)
            );
        }else{
            $addRequestService->insertAddRequest($addRequest);
        }
        //$addRequest->save();
    }



    public static function handle(Message $message, $clientId): void{
        switch ($message->mode){
            case InformType::ADD_FRIENDS:
                static::handleAddRequest($message,$clientId);
                break;
            default:
                self::handleOthers($message,$clientId);
        }
    }
}
