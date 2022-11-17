<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;


Route::group(['prefix'=>'admin'],function (){
    Route::get('/login/{username}/{password}',
        [UserController::class,'login']);
});
