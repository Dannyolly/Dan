<?php
namespace App\Response;

use Illuminate\Http\JsonResponse;

class ApiResponse{
    public string $msg;
    public mixed  $data;
    public string $code;

    public static function create($msg , $data , $code = '200'): bool|string{
        return json_encode([
            'msg'  => $msg,
            'data' => $data,
            'code' => $code
        ]);
    }

    public static function createJSON($msg  , $data , $code = '200'): JsonResponse{
        return response()->json([
            'msg' => $msg,
            'code' => $code,
            'data' => $data,
        ]);
    }
}
