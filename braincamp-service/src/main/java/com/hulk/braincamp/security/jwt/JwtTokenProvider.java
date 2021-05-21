package com.hulk.braincamp.security.jwt;

import com.hulk.braincamp.security.Token;
import org.springframework.security.core.Authentication;

public interface JwtTokenProvider {

    Token generateJwtToken(Authentication authentication);

    String getUsernameFromJwtToken(String token);

    boolean validateJwtToken(String token);
}
