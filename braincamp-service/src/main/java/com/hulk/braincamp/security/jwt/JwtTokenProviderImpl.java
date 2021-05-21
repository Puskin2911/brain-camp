package com.hulk.braincamp.security.jwt;

import java.util.Date;
import javax.annotation.PostConstruct;

import com.hulk.braincamp.config.AuthConfig;
import com.hulk.braincamp.security.Token;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenProviderImpl implements JwtTokenProvider
{

  private static final Logger logger = LoggerFactory.getLogger(JwtTokenProviderImpl.class);

  @Autowired
  private AuthConfig authConfig;

  private Long tokenExpirationMs;

  private String tokenSecret;

  @PostConstruct
  public void init()
  {
    tokenExpirationMs = authConfig.getTokenExpirationMs();
    tokenSecret = authConfig.getTokenSecret();
  }

  @Override
  public Token generateJwtToken(Authentication authentication)
  {
    UserDetails userDetails = (UserDetails)authentication.getPrincipal();

    Date now = new Date();

    String token = Jwts.builder().setSubject(userDetails.getUsername()).setIssuedAt(now)
      .setExpiration(new Date(now.getTime() + tokenExpirationMs)).signWith(SignatureAlgorithm.HS256, tokenSecret)
      .compact();

    return new Token(token, authConfig.getTokenExpirationDays());
  }

  @Override
  public String getUsernameFromJwtToken(String token)
  {
    return Jwts.parser().setSigningKey(tokenSecret).parseClaimsJws(token).getBody().getSubject();
  }

  @Override
  public boolean validateJwtToken(String token)
  {
    try
    {
      Jwts.parser().setSigningKey(tokenSecret).parseClaimsJws(token);
      return true;
    }
    catch (MalformedJwtException e)
    {
      logger.error("Invalid JWT token", e);
      return false;
    }
    catch (ExpiredJwtException e)
    {
      logger.error("JWT token is expired", e);
      return false;
    }
    catch (UnsupportedJwtException e)
    {
      logger.error("JWT token is unsupported", e);
      return false;
    }
    catch (IllegalArgumentException e)
    {
      logger.error("JWT claims string is empty", e);
      return false;
    }
    catch (Exception e)
    {
      logger.error("Unexpected Exception occurs", e);
      return false;
    }
  }

}
