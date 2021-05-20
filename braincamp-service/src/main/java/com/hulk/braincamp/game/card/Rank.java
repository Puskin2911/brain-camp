package com.hulk.braincamp.game.card;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Rank {

    public static final int NUM_OF_RANK = 13;

    public static final int MIN_RANK = 1;

    public static final int MAX_RANK = 13;

    private final int value;

}
