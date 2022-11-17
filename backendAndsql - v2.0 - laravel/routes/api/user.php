<?php

use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'api'],function (){
    // user business
    Route::get('/login',[UserController::class,'login']);
    Route::get('/logout',[UserController::class,'logout']);
    Route::get('/register',[UserController::class,'register']);
    Route::post('/uploadAvatar',[UserController::class,'uploadAvatar']);
    Route::get("/getUserFriends",[UserController::class,'getUserFriends']);
    Route::get('/checkIsFollow/{user1Id}/{user2Id}',[UserController::class,'checkIsFollow']);
    Route::get('/searchUserByWord',[UserController::class,'searchUserByWord']);
    Route::post('/uploadBackgroundImage',[UserController::class,'uploadBackgroundImage']);


    // user auth
    Route::get('/verifyEmail/{email}',[UserController::class,'sendVerifyEmail']) ;
    Route::get('/forgotPassword',[UserController::class,'sendForgotPasswordCode']);
    Route::get('/resetPassword',[UserController::class,'resetPassword']);

    // user crud
    Route::get('/getUserByToken',[UserController::class,'getUserByToken']);
    Route::get('/user/{id}',[UserController::class,'user']);
    Route::get('/getUserByIds',[UserController::class,'getUserByIds']);
    // message
//    Route::get('/getUnreadMessages',[MessageController::class,'getUnreadMessages']);
//    Route::post('/uploadImage',[UserController::class,'uploadImage']);
//    Route::get('/signMessage',[MessageController::class,'signMessage']);

    // notification
    Route::get('/getAllAddRequest',[NotificationController::class,'getAllAddRequest']);
    Route::get('/acceptRequest',[NotificationController::class,'acceptRequest']);
    Route::get('/getAllNotification',[NotificationController::class,'getAllNotification']);
    Route::get('/notifyUser/{fromId}/{toId}/{type}',[NotificationController::class,'notifyUser']);
    Route::get('/getNotificationByNotifyId/{notifyId}',[NotificationController::class,'getNotificationByNotifyId']);
    Route::get('/signNotification',[NotificationController::class,'signNotification']);
    Route::get('/sendFollowNotification',[NotificationController::class,'sendFollowNotification']);

    // post
    Route::get('/getUnReceivePosts/{userId}/{lastPostId}/{page}/{pageSize}',[PostController::class,'getUnReceivePosts']);
    Route::get('/getUserPosts/{userId}/{lastPostId}/{page}/{pageSize}',[PostController::class,'getUserPosts']);
    Route::post('/uploadPost',[PostController::class,'uploadPost']);
    Route::get('/getPostById/{postId}',[PostController::class,'getPostById']);

    // post - comment
    Route::get('/comment',[PostController::class,'comment']);
    Route::get('/getPostComments',[PostController::class,'getPostComments']);
    Route::get('/likeAction/{postId}',[PostController::class,'like']);
    Route::get('/cancelLike/{postId}',[PostController::class,'cancelLike']);

    // chat
    Route::get('/getAllMsg',[ChatController::class,'getAllMsg']);
    Route::get('/signMessage',[ChatController::class,'signMessage']);
    Route::post('/sentPic',[ChatController::class,'sentPic']);
});
