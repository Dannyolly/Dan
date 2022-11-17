<?php
namespace App\Workerman;
use App\Enums\MessageMode;
use App\Models\Message;
use App\Models\VO\User;
use App\Response\ApiResponse;
use App\Workerman\Handler\ChatHandler;
use App\Workerman\Handler\ChatRoomHandler;
use App\Workerman\Handler\InitHandler;
use App\Workerman\Handler\NotificationHandler;
use \GatewayWorker\Lib\Gateway;
use Illuminate\Auth\Access\Gate;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Log;

class Events
{

    public static function onWorkerStart($businessWorker){

    }
    //连接事件
    public static function onConnect($client_id)
    {
        // 向当前client_id发送数据
        //Gateway::sendToClient($client_id, json_encode(['type' => 'init', 'client_id' => $client_id]));
    }

    //当客户端连接上gateway完成websocket握手时触发的回调函数
    public static function onWebSocketConnect($client_id, $data){

    }
    //消息事件
    public static function onMessage(
        string $client_id,
        string $message,
    ){
        $jsonMessage = json_decode($message);

        $realMessage = new Message($jsonMessage);
        Log::notice('new message receive'.$message.'postId:'.$realMessage->post_id);
        if (!isset($realMessage->mode)) {
            $response = ApiResponse::create('missing the key - mode','');
            Gateway::sendToClient($client_id, $response);
            return false;
        }
        // 處理相關業務....
        switch ($jsonMessage->mode){
            case MessageMode::CHAT:
                ChatHandler::handle($realMessage,$client_id);
                break;
            case MessageMode::CHATROOM:
                ChatRoomHandler::handle($realMessage,$client_id);
                break;
            case MessageMode::SIGNATURE:
                break;
            case MessageMode::INIT:
                InitHandler::handle($realMessage,$client_id);
                break;
            default:
                NotificationHandler::handle($realMessage,$client_id);
                break;
        }


    }
    // 连接断开事件
    public static function onClose($client_id){
        Log::notice($client_id.'is disconnected');
        $uid = Gateway::getUidByClientId($client_id);
        Gateway::unbindUid($client_id,$uid);
    }
}
