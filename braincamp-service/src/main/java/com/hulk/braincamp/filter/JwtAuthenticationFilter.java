package com.hulk.braincamp.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.hulk.braincamp.security.SecurityUtils;
import com.hulk.braincamp.security.jwt.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter
{

  private static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

  private final UserDetailsService userDetailsService;

  private final JwtTokenProvider jwtTokenProvider;

  @Autowired
  public JwtAuthenticationFilter(@Qualifier("userDetailsServiceImpl") UserDetailsService userDetailsService,
                                 JwtTokenProvider jwtTokenProvider)
  {
    this.userDetailsService = userDetailsService;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
    throws ServletException, IOException
  {

    String jwtToken = SecurityUtils.resolveToken(request);
    try
    {
      boolean isValid = jwtTokenProvider.validateJwtToken(jwtToken);

      if (isValid)
      {
        String username = jwtTokenProvider.getUsernameFromJwtToken(jwtToken);

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null,
          userDetails.getAuthorities());
        // TODO learn why
        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authToken);
      }
      else
      {
        LOGGER.debug("Invalid jwt token");
      }
    }
    catch (Exception e)
    {
      LOGGER.debug("Exception at JwtAuthentication Filter", e);
    }

    filterChain.doFilter(request, response);
  }

}
