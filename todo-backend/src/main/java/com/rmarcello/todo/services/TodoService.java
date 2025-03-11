package com.rmarcello.todo.services;

import com.rmarcello.todo.beans.Todo;
import org.springframework.stereotype.Service;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TodoService {
    private static final Map<Long, Todo> TODOS = new ConcurrentHashMap<>();
    private static Long CURRENT_MAX_ID = 0L;

    public Collection<Todo> getAllTodos() {
        return TODOS.values();
    }

    public Todo getTodo(Long id) {
        return TODOS.get(id);
    }

    public Todo createTodo(Todo todo) {
        todo.setId(++CURRENT_MAX_ID);
        TODOS.put(todo.getId(), todo);
        return todo;
    }

    public Todo updateTodo(Long id, Todo todo) {
        if (TODOS.containsKey(id)) {
            todo.setId(id);
            TODOS.put(id, todo);
            return todo;
        }
        return null;
    }

    public void clear() {
        TODOS.clear();
        CURRENT_MAX_ID = 0L;
    }
}
