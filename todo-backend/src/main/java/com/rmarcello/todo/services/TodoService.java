package com.rmarcello.todo.services;

import com.rmarcello.todo.beans.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TodoService {
    private final Map<Long, Todo> todos = new HashMap<>();
    private Long currentMaxId = 0L;

    public List<Todo> getAllTodos() {
        return new ArrayList<>(todos.values());
    }

    public Todo getTodoById(Long id) {
        return todos.get(id);
    }

    public Todo createTodo(Todo todo) {
        currentMaxId++;
        todo.setId(currentMaxId);
        todos.put(currentMaxId, todo);
        return todo;
    }

    public Todo updateTodo(Long id, Todo todo) {
        if (!todos.containsKey(id)) {
            return null;
        }
        todo.setId(id);
        todos.put(id, todo);
        return todo;
    }
}