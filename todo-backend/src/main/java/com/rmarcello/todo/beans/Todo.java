package com.rmarcello.todo.beans;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class Todo {
    private Long id;
    private String description;
    private LocalDateTime creationDate;
    private LocalDateTime expirationDate;
    private String category;
    private TodoState state;
}
