package com.hulk.braincamp.game.card;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Stack;

public class DeckOfCards {

    /**
     * Get deck of full cards
     *
     * @return {@code List<Card>}
     */
    public static List<Card> getDeckOfCards() {
        List<Card> cards = new ArrayList<>(52);

        for (int i = Rank.MIN_RANK; i < Rank.MAX_RANK; i++) {
            Rank rank = new Rank(i);
            for (Suit suit : Suit.values()) {
                cards.add(new Card(rank, suit));
            }
        }

        return cards;
    }

    public static Stack<Card> shuffledDeckOfCards() {
        List<Card> cards = getDeckOfCards();
        Collections.shuffle(cards);

        Stack<Card> shuffledCards = new Stack<>();
        shuffledCards.addAll(cards);
        return shuffledCards;
    }

}
