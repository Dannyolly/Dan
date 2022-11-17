<?php

use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'broadcasting'],function (){
    Route::get('test',function (){
        broadcast(new \App\Events\Messages('new message'));
    });

});
