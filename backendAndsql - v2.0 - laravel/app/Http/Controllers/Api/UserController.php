<?php

namespace App\Http\Controllers\Api;

use App\Events\ForgotPasswordEvent;
use App\Events\RegisterEvent;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Services\AddRequestService;
use App\Http\Services\UserService;
use App\Mail\ForgotPassword;
use App\Mail\UserRegister;
use App\Models\AddRequest;
use App\Models\Model\Admin;
use App\Models\Post;
use App\Models\User;
use App\Response\ApiResponse;
use App\Utils\RequestHelper;
use Carbon\Traits\Date;
use Illuminate\Auth\CreatesUserProviders;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Crypt;
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
use Spatie\FlareClient\Api;
use Tymon\JWTAuth\Exceptions\JWTException;
use function Termwind\renderUsing;


class UserController extends ApiController {

    protected UserService $userService;

    protected UploadController $uploadController;

    protected AddRequestService $addRequestService;
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(
        UserService  $userService,
        UploadController  $uploadController,
        AddRequestService $addRequestService
    ){
        //$this->middleware(
        //'token.refresh',
        // ['except' => ['login','register','sendVerifyEmail']]
        //);
        $this->userService = $userService;
        $this->uploadController  = $uploadController;
        $this->addRequestService = $addRequestService;
    }

    /**
     * Get a JWT via given credentials.
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse{
        [$email,$password] = RequestHelper::getParams(['email','password'],$request);

        $credentials = [
            'email' => $email,
            'password' =>  $password
        ];
        if (! $token = Auth::attempt($credentials)) {
            return  ApiResponse::createJSON(
                'error',
                [
                    'error' => 'wrong email or password'
                ],
                401
            );
        }
        return ApiResponse::createJSON(
            'OK',
            [
                'token' => $token,
                'userInfo' => Auth::user()
            ]
        );

    }

    public function logout(): JsonResponse{
        try {
            Auth::logout();
        } catch (JWTException $e){
            throw $e;
        }

        return ApiResponse::createJSON('logout successfully',[
            'success' => !Auth::check(),
        ]);

    }

    public function sendVerifyEmail(string $email):  JsonResponse
    {
        $user = new User([
            'email' => $email
        ]);
        $code = Random::generate(6);
        // 注冊事件 - - -
        RegisterEvent::dispatch(new UserRegister($code,json_encode($user)));
        $redisKey = $user->email.':code';
        Cache::store('redis')->put($redisKey,$code,1000);
        return  ApiResponse::createJSON('OK',[
            'res' => 'send code successfully  code='.$code
        ]);

    }

    public function register(Request $request): JsonResponse
    {
        [$name , $password , $code,$email ] = RequestHelper::getParams(['name','password','code','email'],$request);
        $redisKey = $email.':code';
        $redisCode = '';
        $user =  new User([
            'name'=> $name,
            'email' => $email,
            'password' =>  Hash::make($password),
            'avatar' => ''
        ]);
        try {
            $redisCode = Cache::store('redis')->get($redisKey);
        } catch (InvalidArgumentException $e) {

        }
        Log::notice($code.' '.$redisCode);
        if( $code === $redisCode){
            $id = User::insertGetId($user->toArray());
            $user->id = $id;
            DB::update(
                'update  users set email_verified_at = ?
                        where id = ?',[now(),22]
            );
            Cache::forget($redisKey);
            return ApiResponse::createJSON(
                "OK",
                [
                    'res' => 'register  successfully',
                    'user' => $user
                ]
            );
        }else{
            return $this->response([
                'res' => "code has already expired or doesn't exist"
            ]);
        }

    }

    public function sendForgotPasswordCode(Request $request):  JsonResponse
    {

        $request->validate(['email' => 'required|email']);
        $email = $request->get('email');
        $user = new User([
            'email' => $email
        ]);
        if($this->userService->isUserExist($email)){
            $code = Random::generate(6);
            $redisKey = $email.':forgetCode';
            ForgotPasswordEvent::dispatch(new ForgotPassword($code,json_encode($user)));
            Cache::store('redis')->put($redisKey,$code,1000);
            return $this->response([
                'status' => 'successfully'
            ]);
        }else{
            return $this->response([
                'status' => 'email does not exist'
            ],'200','WRONG');
        }


//        return $status === Password::RESET_LINK_SENT
//            ? back()->with(['status' => __($status)])
//            : back()->withErrors(['email' => __($status)]);
    }

    public function resetPassword(Request $request):  JsonResponse
    {
//        $request->validate([
//            'email' => 'required|email',
//            'password' => 'required|min:8|confirmed',
//            "code" => 'required'
//        ]);
        [
            'email' => $email ,
            'password' => $password,
            'code' => $code
        ] = $request->only(['email','password','code']);


        if($this->userService->isUserExist($email)){
            $redisKey = $email.':forgetCode';
            $redisCode='';
            try {
                $redisCode = Cache::store('redis')->get($redisKey, $code, 1000);
            } catch (InvalidArgumentException $e) {
            }
            if($redisCode === $code){
                $this->userService->updateUserPasswordByEmail(
                    $email,
                    Hash::make($password)
                );
                Cache::forget($redisKey);
                return $this->response([
                    'status' => "reset successfully"
                ]);
            }
            return $this->response([
                'status' => "code has expired"
            ]);
        }
        return $this->response([
            'status' => "WRONG"
        ]);
    }

    public function user($id): JsonResponse
    {
        return ApiResponse::createJSON(
            "OK",
            $this->userService->searchUserById($id)
        );
    }


    public function getUserFriends(Request $request): JsonResponse{
        [$id,$page,$pageSize ] = RequestHelper::getParams(['userId','page','pageSize'],$request);
        return ApiResponse::createJSON(
            'OK',
            $this->userService->getUserFds($id,$page,$pageSize),

        );
    }

    public function checkIsFollow($user1Id,$user2Id): JsonResponse{
        return ApiResponse::createJSON(
            "OK",
            ['isFriend' => (bool)$this->userService->checkRel($user1Id,$user2Id)]
        );
    }

    public function searchUserByWord(Request $request): JsonResponse
    {
        $word = $request->get('word');
        return ApiResponse::createJSON(
            "OK",
            $this->userService->searchUserByWord($word)
        );
    }

    public function uploadBackgroundImage(Request $request): JsonResponse{
        $path = '';
        try {
            $path =  $this->uploadController->uploader($request,'backgroundImage');
        }catch (Exception $e){

        }
        if($path != ''){
            $user_id = $request->get('user_id');
            User::query()->where('id',$user_id)->update(['background' => $path]);
        }
        return ApiResponse::createJSON(
            "OK",
            [
                'path' => $path
            ]
        );
    }

    public function uploadAvatar(Request $request):  JsonResponse
    {
        $path = '';
        try {
            $path =  $this->uploadController->uploader($request,'avatar');
        }catch (Exception $e){

        }
        if($path != ''){
            $user_id = $request->get('user_id');
            User::query()->where('id',$user_id)->update(['avatar' => $path]);
        }
        return $this->response([
            'path'=>$path
        ]);
    }

    public function getUserByIds(Request $request): JsonResponse{
        $ids = json_decode($request->get('ids'));
        return ApiResponse::createJSON(
            'OK',
            $this->userService->getUserByIds($ids)
        );
    }

    public function follow($fromId , $toId): JsonResponse
    {
        $status1 = DB::table('users_rel')->insert([
                'user_id' => $fromId,
                'friend_id' => $toId
        ]);
        $status2 = DB::table('users_rel')->insert([
            'user_id' => $toId,
            'friend_id' => $fromId
        ]);
        return ApiResponse::createJSON(
            "OK",
            [
                'status' => $status1 && $status2
            ]
        );
    }

}
