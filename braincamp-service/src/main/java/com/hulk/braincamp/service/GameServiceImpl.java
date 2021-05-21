package com.hulk.braincamp.service;

import com.hulk.braincamp.dto.ReadyMessage;
import com.hulk.braincamp.dto.RoomDto;
import com.hulk.braincamp.game.action.Action;
import com.hulk.braincamp.game.card.Card;
import com.hulk.braincamp.game.card.DeckOfCards;
import com.hulk.braincamp.model.Cave;
import com.hulk.braincamp.model.Player;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

@Service
public class GameServiceImpl implements GameService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GameServiceImpl.class);

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private final List<Player> players = new ArrayList<>();

    private final List<Cave> caves = new ArrayList<>();

    private Stack<Card> deckOfCards = DeckOfCards.shuffledDeckOfCards();

    private String usernameTurn;

    @Override
    public RoomDto joinRoom(Player player) {
        player.setReady(false);
        player.setCards(new ArrayList<>());

        if (players.isEmpty()) {
            usernameTurn = player.getUsername();
        }

        players.add(player);

        sendMessage("/room/join", player);

        return wrapToRoomDto();
    }

    @Override
    public void leaveRoom(Player player) {
        for (int i = 0; i < players.size(); i++) {
            if (players.get(i).getUsername().equals(player.getUsername())) {
                players.remove(i);
                return;
            }
        }
        sendMessage("/room/leave", player);
    }

    @Override
    public void updatePlayerReady(ReadyMessage readyMessage) {
        boolean isAllReady = true;
        for (Player player : players) {
            if (player.getUsername().equals(readyMessage.getUsername())) {
                player.setReady(readyMessage.isReady());
            }
            if (!player.isReady()) {
                isAllReady = false;
            }
        }

        if (isAllReady) {
            startGame();
        } else {
            sendMessage("/room" + "/ready", readyMessage);
        }
    }

    @Override
    public void action(String username, Action action) {

    }

    private void startGame() {
        distributeCards();
        sendMessage("/room" + "/game/start", wrapToRoomDto());
    }

    private void distributeCards() {
        for (Player player : players) {
            player.getCard(deckOfCards.pop());
        }
    }

    private void sendMessage(String destination, Object payload) {
        try {
            messagingTemplate.convertAndSend(destination, payload);
            LOGGER.info("Message was sent to {}", destination);
        } catch (MessagingException e) {
            LOGGER.error("Can not send start message to " + destination, e);
        }
    }

    private RoomDto wrapToRoomDto() {
        return RoomDto.builder()
                .players(players)
                .caves(caves)
                .usernameTurn(usernameTurn)
                .build();
    }

}
