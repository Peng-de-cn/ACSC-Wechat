package com.acsc.api;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
@MapperScan("com.acsc.api.dao")
public class AcscApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(AcscApiApplication.class, args);
    }

}
