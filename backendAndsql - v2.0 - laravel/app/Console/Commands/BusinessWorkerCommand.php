<?php

namespace App\Console\Commands;
use GatewayWorker\BusinessWorker;
use GatewayWorker\Gateway;
use GatewayWorker\Register;
use Illuminate\Console\Command;
use Workerman\Worker;

class BusinessWorkerCommand extends Command
{
    protected $signature = 'businessworker {action} {--d}';
    protected $description = 'Start a businessworker server.';

    public function handle()
    {
        global $argv;
        $action = $this->argument('action');
        //$argv[0] = 'artisan';
        $argv[1] = $action;
        $argv[2] = $this->option('d') ? '-d' : '';
        $this->start();
    }

    private function startBusinessWorker()
    {
        $worker                  = new BusinessWorker();
        //work名称
        $worker->name            = 'BusinessWorker';
        //businessWork进程数
        $worker->count           = 2;
        //服务注册地址
        $worker->registerAddress = '127.0.0.1:1236';
        //设置\App\Workerman\Events类来处理业务
        $worker->eventHandler    = \App\Workerman\Events::class;
    }

    private function start()
    {
        $this->startBusinessWorker();
        Worker::runAll();
    }

    private function startRegister()
    {
        new Register('text://0.0.0.0:1236');
    }
}
