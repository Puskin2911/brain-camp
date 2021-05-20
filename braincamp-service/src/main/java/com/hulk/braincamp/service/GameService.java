package com.hulk.braincamp.service;

import com.hulk.braincamp.dto.ReadyMessage;
import com.hulk.braincamp.dto.RoomDto;
import com.hulk.braincamp.game.action.Action;
import com.hulk.braincamp.model.Player;

public interface GameService {

    RoomDto joinRoom(Player player);

    void leaveRoom(Player player);

    void updatePlayerReady(ReadyMessage readyMessage);

    void action(String username, Action action);

}
