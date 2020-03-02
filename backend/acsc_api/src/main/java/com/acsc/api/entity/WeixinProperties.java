package com.acsc.api.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "weixin")
@PropertySource(value = "classpath:app.properties")
@Getter
@Setter
@ToString
public class WeixinProperties {
    private String host;
    private String path;
    private String secret;
    private String appid;
    private String grant_type;
    private String method;
}
