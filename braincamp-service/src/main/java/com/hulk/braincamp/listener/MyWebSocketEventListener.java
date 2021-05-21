package com.hulk.braincamp.listener;

import java.security.Principal;
import java.util.Objects;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

@Component
public class MyWebSocketEventListener
{

  private static final Logger LOGGER = LoggerFactory.getLogger(MyWebSocketEventListener.class);

  @EventListener
  public void handleWebSocketConnectListener(SessionConnectedEvent event)
  {
    Principal principal = event.getUser();
    LOGGER.info("Received a new web socket connection from user {}", Objects.requireNonNull(principal).getName());
  }

  @EventListener
  public void handleSubscribe(SessionSubscribeEvent event)
  {
    StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

    String destination = headerAccessor.getDestination();
    String username = Objects.requireNonNull(event.getUser()).getName();

    LOGGER.info("User {} have just subscribe to {}", username, destination);
  }

  @EventListener
  public void handleUnSubscribe(SessionUnsubscribeEvent event)
  {
  }

  @EventListener
  public void handleWebSocketDisconnectListener(SessionDisconnectEvent event)
  {
    String username = Objects.requireNonNull(event.getUser()).getName();

    LOGGER.info("UserId {} had disconnected!", username);
  }

}
