package com.rmarcello.todo.beans;

import java.time.LocalDate;

public class Todo {
    private Long id;
    private String description;
    private LocalDate creationDate;
    private LocalDate expirationDate;
    private String category;
    private State state;

    public enum State {
        DONE, ACTIVE, CANCELED
    }

    public Todo() {}

    public Todo(Long id, String description, LocalDate creationDate, LocalDate expirationDate, String category, State state) {
        this.id = id;
        this.description = description;
        this.creationDate = creationDate;
        this.expirationDate = expirationDate;
        this.category = category;
        this.state = state;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocalDate getCreationDate() { return creationDate; }
    public void setCreationDate(LocalDate creationDate) { this.creationDate = creationDate; }
    public LocalDate getExpirationDate() { return expirationDate; }
    public void setExpirationDate(LocalDate expirationDate) { this.expirationDate = expirationDate; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public State getState() { return state; }
    public void setState(State state) { this.state = state; }
}
