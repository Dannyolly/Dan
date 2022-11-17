package com.example.netty.WebSocket;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class NettyBoot implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

        try {
            WebSocketServer webSocketServer = new WebSocketServer();
            webSocketServer.runServer();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}


