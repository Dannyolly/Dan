<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Services\ChatService;
use App\Models\Chat;
use App\Response\ApiResponse;
use App\Utils\RequestHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class ChatController extends ApiController {

    public ChatService $chatService;

    public UploadController $uploadController;

    /**
     * @param ChatService $chatService
     * @param UploadController $uploadController
     */
    public function __construct(ChatService $chatService, UploadController $uploadController)
    {
        $this->chatService = $chatService;
        $this->uploadController = $uploadController;
    }


    public function signMessage(Request $request): JsonResponse{
        $ids = json_decode( $request->get('ids'));
        return ApiResponse::createJSON(
            'OK',
            $this->chatService->signMsg($ids)
        );
    }

    public function getAllMsg(Request $request): JsonResponse{
        $id = $request->get('id');
        return ApiResponse::createJSON(
            'OK',
            $this->chatService->getMsgByUserId($id)
        );
    }

    public function sentMsg($user_id,$to_id,$message,$url): array
    {

        $chat = new Chat([
            'user_id' => $user_id,
            'to_id'  =>$to_id,
            'message' => $message,
            'url' => $url,
            'created_at' => now()
        ]);
        $id = $this->chatService->insertChatMsg($chat);
        $chat->fill(['id' => $id]);
        return  $chat->toArray();
    }

    public function sentPic(Request $request): JsonResponse{
        return ApiResponse::createJSON(
            'OK',
            [
                'path' => $this->uploadController->uploader($request,'chatImage')
            ]
        );
    }
}
