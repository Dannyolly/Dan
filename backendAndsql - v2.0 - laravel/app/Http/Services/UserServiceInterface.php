<?php

namespace App\Http\Services;


use App\Models\VO\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Facade;

interface UserServiceInterface  {

    public  function getAllUsers(): array;

    public  function searchUserById($id);


}
