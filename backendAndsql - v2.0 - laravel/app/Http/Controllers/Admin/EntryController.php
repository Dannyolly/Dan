<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class EntryController extends Controller
{
    //
    public function loginForm(): string
    {
        return view('welcome');
    }

    public function login(): \Illuminate\Http\JsonResponse
    {
        return response()->json(
            DB::table('users')->where('name')
        );
    }
}
