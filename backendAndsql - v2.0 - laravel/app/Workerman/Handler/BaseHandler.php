<?php
namespace App\Workerman\Handler;
use App\Models\Message;
use App\Models\User;
use App\Response\ApiResponse;
use \GatewayWorker\Lib\Gateway;
use Illuminate\Auth\Access\Gate;
use Illuminate\Support\Facades\Log;

class BaseHandler{
    public static function handle(
        Message $message,
        string $clientId,
    ): void{

    }

    public static function getClientIdByToIdAndCheckIsOnline($toId):string|null{
        $to_client = Gateway::getClientIdByUid($toId);
        if(count($to_client) != 0){
            return $to_client[0];
        }
        return null;
    }

    public static function send(Message $message): bool{
        $toClientId = self::getClientIdByToIdAndCheckIsOnline($message->to_id);
        //Log::notice('new Notification'.json_encode($message->toArray()));
        if(!is_null($toClientId)){
            Gateway::sendToClient(
                $toClientId,
                ApiResponse::create('OK',$message->toArray())
            );
            return true;
        }

        return false;
    }
}
