package com.example.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class FileConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        //icon
        registry.addResourceHandler("/img/icon/**")
                .addResourceLocations("file:"+System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                        +System.getProperty("file.separator")+"icon"+System.getProperty("file.separator")
                );

        //qrcode
        registry.addResourceHandler("/img/QRcode/**")
                .addResourceLocations("file:"+System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                        +System.getProperty("file.separator")+"QRcode"+System.getProperty("file.separator")
                );

        //post
        registry.addResourceHandler("/img/post/**")
                .addResourceLocations("file:"+System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                        +System.getProperty("file.separator")+"post"+System.getProperty("file.separator")
                );

        //backgroundImage
        registry.addResourceHandler("/img/backgroundImage/**")
                .addResourceLocations("file:"+System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                        +System.getProperty("file.separator")+"backgroundImage"+System.getProperty("file.separator")
                );

        //message
        registry.addResourceHandler("/img/message/**")
                .addResourceLocations("file:"+System.getProperty("user.dir")+System.getProperty("file.separator")+"img"
                        +System.getProperty("file.separator")+"message"+System.getProperty("file.separator")
                );
    }
}