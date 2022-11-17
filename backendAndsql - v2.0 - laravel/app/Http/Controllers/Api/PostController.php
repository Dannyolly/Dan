<?php

namespace App\Http\Controllers\Api;


use App\Http\Services\CommentService;
use App\Http\Services\PostService;
use App\Http\Services\UserService;
use App\Response\ApiResponse;
use App\Utils\RequestHelper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PostController extends ApiController {

    protected UserService $userService;

    protected UploadController $uploadController;

    protected CommentService $commentService;

    protected PostService $postService;

    public function __construct(
        UserService $userService,
        UploadController $uploadController,
        CommentService $commentService,
        PostService $postService
    ){
        $this->userService = $userService;
        $this->uploadController = $uploadController;
        $this->commentService = $commentService;
        $this->postService = $postService;
    }

    public function getUnReceivePosts($userId,$lastPostId,$page,$pageSize): JsonResponse{
        if(!$userId){
            return ApiResponse::createJSON(
                'WRONG',
                'userId is not found'
            );
        }
        return ApiResponse::createJSON(
            'OK',
            $this->postService->getUnReceivePost($userId,$lastPostId,$page,$pageSize)
        );
    }

    public function getUserPosts($userId,$lastPostId,$page,$pageSize): JsonResponse
    {
        if(!$userId){
            return ApiResponse::createJSON(
                'WRONG',
                'userId is not found'
            );
        }
        return ApiResponse::createJSON(
            'OK',
            $this->postService->getUserPosts($userId,$lastPostId,$page,$pageSize)
        );
    }

    public function getPostById($postId): JsonResponse
    {
        return ApiResponse::createJSON(
            'OK',
            $this->postService->getPostById($postId)
        );
    }

    public function getPostComments(Request $request): JsonResponse
    {
        $postId = $request->get('postId');
        $pageSize = $request->get('pageSize');
        $page = $request->get('page');
        return ApiResponse::createJSON(
            'OK',
            $this->postService->getPostComments($postId,$pageSize,$page)
        );
    }

    public function like($postId): JsonResponse{
        // notify Poster
        return ApiResponse::createJSON(
            'OK',
            $this->postService->updatePostLike($postId)
        );
    }

    public function cancelLike($postId): JsonResponse{
        return ApiResponse::createJSON(
            'OK',
            $this->postService->cancelPostLike($postId)
        );
    }

    public function uploadPost(Request $request): JsonResponse{
        [$title ,$content,$user_id] = array_values($request->only(['title','content','user_id']));
        $path = "";
        if($request->exists('image')) {
            $path = $this->uploadController->uploader($request, 'postImage');
        }
        $postId = $this->postService->insertPost($title,$content,$path,$user_id);
        return ApiResponse::createJSON(
            "OK",
                [
                    "path" => $path,
                    'postId' =>$postId
                ]
        );
    }

    public function comment(Request $request): JsonResponse{
        [$postId,$content,$userId] = RequestHelper::getParams(['postId','content','user_id'],$request);
        $status = $this->postService->insertComment($postId,$content,$userId);
        $this->postService->updatePostComment($postId);
        return ApiResponse::createJSON(
            'OK',
                [
                    'status' => $status
                ]
        );
    }
}
