package com.hulk.braincamp.game.action;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hulk.braincamp.game.card.Card;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Action {

    private ActionType actionType;

    private List<Card> cards;

    private Map<Card, Card> doCards;

}
