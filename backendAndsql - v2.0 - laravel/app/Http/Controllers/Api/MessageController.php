<?php

namespace App\Http\Controllers\Api;

use App\Events\RegisterEvent;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Services\UserService;
use App\Mail\UserRegister;
use App\Models\Model\Admin;
use App\Models\Notification;
use App\Models\Post;
use App\Models\User;
use App\Response\ApiResponse;
use Carbon\Traits\Date;
use Illuminate\Auth\CreatesUserProviders;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;
use Mockery\Exception;
use Nette\Utils\Random;
use PhpParser\JsonDecoder;
use PHPUnit\Util\Json;
use Psr\SimpleCache\InvalidArgumentException;
use Tymon\JWTAuth\Exceptions\JWTException;


class MessageController extends ApiController {

    protected UserService $userService;

    protected UploadController $uploadController;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(
        UserService  $userService,
        UploadController  $uploadController
    ){
        //$this->middleware(
        //'token.refresh',
        // ['except' => ['login','register','forgotPassword']]
        //);
        $this->userService = $userService;
        $this->uploadController  = $uploadController;
    }

    /**
     * message
     */
    public function getUnreadMessages($userId): bool|string
    {
        $res = DB::select(
            'select * from laravel.messages where to_id = ?',[$userId]
        );
        $postIds = [];
        if(count($res) != 0){
            for ($i = 0 ; $i< count($res);$i++){
                array_push($postIds,$res[$i]);
            }
            $this->signMessage($postIds);
            return ApiResponse::create(
                'ok',
                $res,
                200
            );
        }
        return ApiResponse::create(
            'no unread message',
            $res,
            200
        );

    }

    public function signMessage(Request $request): JsonResponse
    {
        $a = new Notification();
        $postIds = json_decode($request->get('postIds'));
        $deleteStr = '';
        $len = count($postIds)-1;
        for ($i = 0 ; $i< $len;$i++){
            $deleteStr = $postIds[$i].' , ';
        }
        $deleteStr .= $postIds[$len];
        return  ApiResponse::createJSON(
            'OK',
            DB::delete(
                'delete from laravel.messages where id in (?)',[$deleteStr]
            )
        );
    }


}
