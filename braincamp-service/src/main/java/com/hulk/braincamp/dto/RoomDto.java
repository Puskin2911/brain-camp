package com.hulk.braincamp.dto;

import com.hulk.braincamp.model.Cave;
import com.hulk.braincamp.model.Player;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class RoomDto {

    private List<Player> players;

    private List<Cave> caves;

    private String usernameTurn;

}
