package com.hulk.braincamp.security.auth;

import java.util.Collections;

import com.hulk.braincamp.config.WebSecurityConfig;
import com.hulk.braincamp.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService
{

  private static final Logger LOGGER = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
  {

    for (User user : WebSecurityConfig.USERS)
    {
      if (user.getUsername().equals(username))
      {
        return new org.springframework.security.core.userdetails.User(username, user.getPassword(),
          Collections.emptyList());
      }
    }

    throw new UsernameNotFoundException("Not found username: " + username);
  }

}
