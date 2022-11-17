<?php

namespace App\Console\Commands;
use GatewayWorker\BusinessWorker;
use GatewayWorker\Gateway;
use GatewayWorker\Register;
use Illuminate\Console\Command;
use Workerman\Worker;

class RegisterCommand extends Command
{
    protected $signature = 'register {action} {--d}';
    protected $description = 'Start a register server.';

    public function handle()
    {
        global $argv;
        $action = $this->argument('action');
        $argv[1] = $action;
        $argv[2] = $this->option('d') ? '-d' : '';
        $this->start();
    }

    private function start()
    {
        $this->startRegister();
        Worker::runAll();
    }

    private function startRegister()
    {
        new Register('text://0.0.0.0:1236');
    }
}
