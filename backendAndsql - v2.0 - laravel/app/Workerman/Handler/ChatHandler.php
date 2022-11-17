<?php
namespace App\Workerman\Handler;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Services\ChatService;
use App\Models\Chat;
use App\Models\Message;
use App\Response\ApiResponse;
use \GatewayWorker\Lib\Gateway;
use Illuminate\Auth\Access\Gate;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ChatHandler extends BaseHandler {

    public static function handle(Message $message,string $client_id): void{

        // 1. 保存信息
        $chatController =  new ChatController(new ChatService(),new UploadController());
        //$res = $chatController->sentMsg($message->user_id,$message->to_id,$message->message,$message->pic);

        // 2. 查看用戶是否在線,在線則發送
        $to_client = self::getClientIdByToIdAndCheckIsOnline($message->to_id);
        if($to_client){
            $message->extendFields = new Chat([
                'user_id' => $message->user_id,
                'to_id' => $message->to_id,
                'message' => $message->message,
                'url' => $message->pic,
                'created_at' => now()
            ]);
            Gateway::sendToClient(
                $to_client,
                ApiResponse::create('OK',$message)
            );
        }else{
            $chatController->sentMsg($message->user_id,$message->to_id,$message->message,$message->pic);

        }
        Log::notice($message->user_id.' send a message to '.$message->to_id);

    }
}
