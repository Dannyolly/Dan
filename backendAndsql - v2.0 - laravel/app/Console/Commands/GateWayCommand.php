<?php

namespace App\Console\Commands;
use GatewayWorker\BusinessWorker;
use GatewayWorker\Gateway;
use GatewayWorker\Register;
use Illuminate\Console\Command;
use Workerman\Worker;
class GateWayCommand extends Command
{
    protected $signature = 'gateway {action} {--d}';
    protected $description = 'Start a gateway server.';

    public function handle()
    {
        global $argv;
        $action = $this->argument('action');
        //$argv[0] = 'artisan';
        $argv[1] = $action;
        $argv[2] = $this->option('d') ? '-d' : '';
        $this->start();
    }
    private function start()
    {
        $this->startGateWay();
        Worker::runAll();
    }

    private function startGateWay()
    {
        //gateway进程
        $gateway = new Gateway("websocket://0.0.0.0:2346");
        //gateway名称 status方便查看
        $gateway->name                 = 'Gateway';
        //gateway进程
        $gateway->count                = 2;
        //本机ip
        $gateway->lanIp                = '127.0.0.1';
        //内部通讯起始端口，如果$gateway->count = 4 起始端口为2300
        //则一般会使用 2300，2301 2个端口作为内部通讯端口
        $gateway->startPort            = 2300;
        //心跳间隔
        $gateway->pingInterval         = 30;
        //客户端连续$pingNotResponseLimit次$pingInterval时间内不发送任何数据则断开链接，并触发onClose。
        //我们这里使用的是服务端主动发送心跳所以设置为0
        $gateway->pingNotResponseLimit = 0;
        //心跳数据
        $gateway->pingData             = '{"type":"@heart@"}';
        //服务注册地址
        $gateway->registerAddress      = '127.0.0.1:1236';
    }

}
