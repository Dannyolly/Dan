<?php

namespace App\Providers;


use App\Http\Controllers\Api\UserServiceInterface;
use Illuminate\Auth\SessionGuard;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Services\Auth\JwtGuard;
use App\Models\VO\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;
use \Illuminate\Contracts\Foundation\Application;

class AppServiceProvider extends ServiceProvider
{
    /**
     * RegisterEvent any application services.
     *
     * @return void
     */
    public function register()
    {
        //

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {

    }
}
