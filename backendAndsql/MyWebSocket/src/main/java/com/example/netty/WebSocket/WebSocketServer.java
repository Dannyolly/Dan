package com.example.netty.WebSocket;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.ServerChannel;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class WebSocketServer {


    public  void runServer() {
        // 主
        EventLoopGroup mainGroup = new NioEventLoopGroup();

        // 從
        EventLoopGroup subGroup = new NioEventLoopGroup();


        try {
            ServerBootstrap serverBootstrap=new ServerBootstrap();

            serverBootstrap.group(mainGroup,subGroup)
                    .channel(NioServerSocketChannel.class)
                    .childHandler(new NettyInitializer());

            ChannelFuture future = serverBootstrap.bind(8889).sync();
            future.channel().closeFuture().sync();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            mainGroup.shutdownGracefully();
            subGroup.shutdownGracefully();
        }
    }

}
