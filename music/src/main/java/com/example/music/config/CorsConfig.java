package com.example.music.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/**") //允许跨域访问的路径
                .allowedOriginPatterns("*") //允许跨域访问的源
                .allowedMethods("POST","GET","PUT","OPTIONS","DELETE") //允许请求方法
                .maxAge(36000) //预检间隔时间
                .allowedHeaders("*") //允许头部时间
                .allowCredentials(true); //是否发送cookie
    }
}
