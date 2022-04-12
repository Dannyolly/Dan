package com.example.netty.WebSocket;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;

import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.netty.handler.timeout.IdleStateHandler;

/**
 * 初始化
 */

public class NettyInitializer extends ChannelInitializer<NioSocketChannel> {




    @Override
    protected void initChannel(NioSocketChannel channel) throws Exception {
        ChannelPipeline pipeline =channel.pipeline();

        // HTTP 解碼器
        pipeline.addLast("danny",new HttpServerCodec());

        //數據流
        pipeline.addLast(new ChunkedWriteHandler());

        //把請求轉化為 request 或 response
        pipeline.addLast(new HttpObjectAggregator(1024*64));

        // 心跳組件...
        //pipeline.addLast(new IdleStateHandler(8,10,12));

        ///pipeline.addLast(new HeartBeatHandler());



        // 路徑 會幫你處理握手動作..
        pipeline.addLast(new WebSocketServerProtocolHandler("/ws"));

        // 自定義handler
        pipeline.addLast(new ChatHandler());


    }
}
