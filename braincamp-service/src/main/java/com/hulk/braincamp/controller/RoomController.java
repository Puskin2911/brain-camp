package com.hulk.braincamp.controller;

import com.hulk.braincamp.dto.RoomDto;
import com.hulk.braincamp.model.Player;
import com.hulk.braincamp.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(RoomController.ROOM_RESOURCE)
public class RoomController {

    public static final String ROOM_RESOURCE = "/api/room";

    @Autowired
    private GameService gameService;

    @PostMapping(value = "/join")
    public ResponseEntity<RoomDto> joinRoom(@RequestBody Player player) {
        return ResponseEntity.ok(gameService.joinRoom(player));
    }

    @PostMapping(value = "/leave")
    public ResponseEntity<?> leaveRoom(@RequestBody Player player) {

        gameService.leaveRoom(player);

        return ResponseEntity.noContent().build();
    }

}
