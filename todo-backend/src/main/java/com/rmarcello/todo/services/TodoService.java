package com.rmarcello.todo.services;

import com.rmarcello.todo.beans.Todo;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TodoService {
    private static final Map<Long, Todo> TODOS = new HashMap<>();
    private static Long CURRENT_MAX_ID = 0L;

    public List<Todo> getAllTodos() {
        return new ArrayList<>(TODOS.values());
    }

    public Todo addTodo(Todo todo) {
        CURRENT_MAX_ID++;
        todo.setId(CURRENT_MAX_ID);
        TODOS.put(CURRENT_MAX_ID, todo);
        return todo;
    }

    public Optional<Todo> getTodoById(Long id) {
        return Optional.ofNullable(TODOS.get(id));
    }

    public Optional<Todo> updateTodo(Long id, Todo updatedTodo) {
        if (TODOS.containsKey(id)) {
            updatedTodo.setId(id);
            TODOS.put(id, updatedTodo);
            return Optional.of(updatedTodo);
        }
        return Optional.empty();
    }

    // Method to clear all todos - useful for testing
    public void clearAllTodos() {
        TODOS.clear();
        CURRENT_MAX_ID = 0L;
    }
}
