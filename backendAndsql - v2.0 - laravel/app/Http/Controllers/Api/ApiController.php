<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Response\ApiResponse;
use Illuminate\Http\JsonResponse;


class ApiController extends Controller{


    public function response($data , $code = 200, $msg='OK'): JsonResponse
    {
        return ApiResponse::createJSON(
            $msg,
            $data,
            $code
        );
    }
    /**
     * Refresh a token.
     *
     * @return JsonResponse
     */
    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 1,
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function getUserByToken(): JsonResponse{
        return response()->json(auth()->user());
    }
}
