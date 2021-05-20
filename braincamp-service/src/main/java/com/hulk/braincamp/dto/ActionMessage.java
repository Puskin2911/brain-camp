package com.hulk.braincamp.dto;

import com.hulk.braincamp.game.action.Action;
import lombok.Data;

@Data
public class ActionMessage {

    private Action action;

    private String username;

}
