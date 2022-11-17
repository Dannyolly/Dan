<?php

namespace App\Http\Controllers\Api;


use App\Models\User;
use Illuminate\Http\Request;

class UploadController extends ApiController {

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth:api', ['except' => ['uploader']]);
    }

    public function uploader(Request $request,string $fileName = 'image'){
        return $request->file('image')->store($fileName);
    }

    public function index(){
        return view('upload');
    }

}
