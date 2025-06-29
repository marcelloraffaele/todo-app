package com.rmarcello.todo.services;

import com.rmarcello.todo.beans.Todo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class TodoServiceTest {
    private TodoService todoService;

    @BeforeEach
    void setUp() {
        todoService = new TodoService();
        todoService.clearAllTodos(); // Clear static data before each test
    }

    @Test
    void testAddAndGetAllTodos() {
        Todo todo = new Todo(null, "Test", LocalDate.now(), LocalDate.now().plusDays(1), "work", Todo.State.ACTIVE);
        todoService.addTodo(todo);
        List<Todo> todos = todoService.getAllTodos();
        assertEquals(1, todos.size());
        assertEquals("Test", todos.get(0).getDescription());
    }

    @Test
    void testGetTodoById() {
        Todo todo = new Todo(null, "Test", LocalDate.now(), LocalDate.now().plusDays(1), "work", Todo.State.ACTIVE);
        Todo created = todoService.addTodo(todo);
        Optional<Todo> found = todoService.getTodoById(created.getId());
        assertTrue(found.isPresent());
        assertEquals("Test", found.get().getDescription());
    }

    @Test
    void testUpdateTodo() {
        Todo todo = new Todo(null, "Test", LocalDate.now(), LocalDate.now().plusDays(1), "work", Todo.State.ACTIVE);
        Todo created = todoService.addTodo(todo);
        Todo updated = new Todo(null, "Updated", LocalDate.now(), LocalDate.now().plusDays(2), "home", Todo.State.DONE);
        Optional<Todo> result = todoService.updateTodo(created.getId(), updated);
        assertTrue(result.isPresent());
        assertEquals("Updated", result.get().getDescription());
        assertEquals(Todo.State.DONE, result.get().getState());
    }

    @Test
    void testUpdateTodoNotFound() {
        Todo updated = new Todo(null, "Updated", LocalDate.now(), LocalDate.now().plusDays(2), "home", Todo.State.DONE);
        Optional<Todo> result = todoService.updateTodo(999L, updated);
        assertFalse(result.isPresent());
    }
}
