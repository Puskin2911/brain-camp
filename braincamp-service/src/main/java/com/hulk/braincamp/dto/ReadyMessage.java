package com.hulk.braincamp.dto;

import lombok.Data;
import org.springframework.lang.NonNull;

@Data
public class ReadyMessage {

    @NonNull
    private String username;

    @NonNull
    private boolean ready;

}
