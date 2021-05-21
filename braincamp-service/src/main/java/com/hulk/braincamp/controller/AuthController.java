package com.hulk.braincamp.controller;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import com.hulk.braincamp.config.WebSecurityConfig;
import com.hulk.braincamp.dto.LoginRequest;
import com.hulk.braincamp.model.User;
import com.hulk.braincamp.security.SecurityUtils;
import com.hulk.braincamp.security.Token;
import com.hulk.braincamp.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController
{
  private final AuthenticationManager authenticationManager;
  private final JwtTokenProvider jwtTokenProvider;

  @Autowired
  public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider)
  {
    this.authenticationManager = authenticationManager;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @PostMapping("/login")
  public ResponseEntity<Token> login(@RequestBody LoginRequest loginRequest)
  {
    Authentication authentication = authenticationManager
      .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);

    Token token = jwtTokenProvider.generateJwtToken(authentication);

    return ResponseEntity.ok(token);
  }

  @GetMapping("/validate")
  public ResponseEntity<User> validateUser(HttpServletRequest request)
  {
    String accessToken = SecurityUtils.resolveToken(request);
    boolean isValidToken = jwtTokenProvider.validateJwtToken(accessToken);
    if (isValidToken)
    {
      String username = jwtTokenProvider.getUsernameFromJwtToken(accessToken);

      for (User user : WebSecurityConfig.USERS)
      {
        if (user.getUsername().equals(username))
        {
          return ResponseEntity.ok(user);
        }
      }
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }
}
