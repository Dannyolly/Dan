<?php

namespace App\Utils;

use Illuminate\Http\Request;

class RequestHelper
{

    public static function getParams(array $arr, Request $request): array
    {
        return array_values($request->only($arr));
    }
}
