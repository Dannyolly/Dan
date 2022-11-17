<?php
namespace App\Workerman\Handler;
use App\Enums\MessageMode;
use App\Models\Message;
use \GatewayWorker\Lib\Gateway;
use Illuminate\Auth\Access\Gate;
use Illuminate\Support\Facades\Log;

class InitHandler extends BaseHandler {

    public static function handle(Message $message ,string $client_id): void{
        Log::notice('user_id= '.$message->user_id.' client_id='.$client_id.' is connected');
        Gateway::bindUid($client_id,$message->user_id);

    }
}
