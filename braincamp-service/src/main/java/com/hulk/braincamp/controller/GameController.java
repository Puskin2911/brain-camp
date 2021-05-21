package com.hulk.braincamp.controller;

import com.hulk.braincamp.dto.ActionMessage;
import com.hulk.braincamp.dto.ChatMessage;
import com.hulk.braincamp.dto.ReadyMessage;
import com.hulk.braincamp.service.GameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    private static final Logger LOGGER = LoggerFactory.getLogger(GameController.class);

    @Autowired
    private GameService gameService;

    @MessageMapping("/room/chat")
    @SendTo("/room/chat")
    public ChatMessage handleChat(@Payload ChatMessage message) {
        return message;
    }

    @MessageMapping("/room/action")
    public void handleMove(@Payload ActionMessage actionMessage) {
        LOGGER.info("Receive a MoveMessage from client!, {}", actionMessage.toString());
    }

    @MessageMapping("/room/ready")
    public void handleReady(@Payload ReadyMessage message) {
        LOGGER.info("Receive a ReadyMessage from client!, {}", message.toString());

        gameService.updatePlayerReady(message);
    }

}
