package com.hulk.braincamp.config;

import javax.annotation.PostConstruct;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class AuthConfig
{

    @Autowired
    private Environment environment;

    private String tokenSecret;

    private long tokenExpirationMs;

    @PostConstruct
    public void init() {
        this.tokenSecret = environment.getProperty("braincamp.auth.tokenSecret", "ccgameTokenSecret");

        this.tokenExpirationMs = environment
                .getProperty("braincamp.auth.tokenExpirationMs", Long.class, 86400000L);
    }

    public int getTokenExpirationDays(){
        return (int)(tokenExpirationMs / 1000 / 24);
    }

}
