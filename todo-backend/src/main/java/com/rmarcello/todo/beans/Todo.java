package com.rmarcello.todo.beans;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class Todo {
    private Long id;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Creation date is required")
    private LocalDateTime creationDate;
    
    private LocalDateTime expirationDate;
    
    private String category;
    
    @NotNull(message = "State is required")
    private TodoState state;

    // Default constructor
    public Todo() {
        this.creationDate = LocalDateTime.now();
        this.state = TodoState.ACTIVE;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDateTime expirationDate) {
        this.expirationDate = expirationDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public TodoState getState() {
        return state;
    }

    public void setState(TodoState state) {
        this.state = state;
    }
}