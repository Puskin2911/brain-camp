package com.hulk.braincamp.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hulk.braincamp.game.card.Card;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Player {

    private int slot;

    private String username;

    private String team;

    private boolean ready;

    private List<Card> cards;

    public void getCard(List<Card> cards) {
        this.cards.addAll(cards);
    }

    public void getCard(Card card) {
        if(cards == null) {
            cards = new ArrayList<>();
        }
        cards.add(card);
    }

}
