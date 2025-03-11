package com.rmarcello.todo.services;

import com.rmarcello.todo.beans.Todo;
import com.rmarcello.todo.beans.TodoState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import java.util.Collection;

import static org.junit.jupiter.api.Assertions.*;

class TodoServiceTest {

    private TodoService todoService;

    @BeforeEach
    void setUp() {
        todoService = new TodoService();
        todoService.clear(); // Clear the state before each test
    }

    @Test
    void shouldCreateAndRetrieveTodo() {
        // Given
        Todo todo = new Todo();
        todo.setDescription("Test Todo");
        todo.setCreationDate(LocalDateTime.now());
        todo.setExpirationDate(LocalDateTime.now().plusDays(1));
        todo.setCategory("TEST");
        todo.setState(TodoState.ACTIVE);

        // When
        Todo createdTodo = todoService.createTodo(todo);

        // Then
        assertNotNull(createdTodo.getId());
        Todo retrievedTodo = todoService.getTodo(createdTodo.getId());
        assertNotNull(retrievedTodo);
        assertEquals("Test Todo", retrievedTodo.getDescription());
    }

    @Test
    void shouldUpdateTodo() {
        // Given
        Todo todo = new Todo();
        todo.setDescription("Original Todo");
        todo.setCreationDate(LocalDateTime.now());
        todo.setExpirationDate(LocalDateTime.now().plusDays(1));
        todo.setCategory("TEST");
        todo.setState(TodoState.ACTIVE);
        Todo createdTodo = todoService.createTodo(todo);

        // When
        Todo updateTodo = new Todo();
        updateTodo.setDescription("Updated Todo");
        updateTodo.setCreationDate(todo.getCreationDate());
        updateTodo.setExpirationDate(todo.getExpirationDate());
        updateTodo.setCategory("TEST");
        updateTodo.setState(TodoState.DONE);
        
        Todo updatedTodo = todoService.updateTodo(createdTodo.getId(), updateTodo);

        // Then
        assertNotNull(updatedTodo);
        assertEquals("Updated Todo", updatedTodo.getDescription());
        assertEquals(TodoState.DONE, updatedTodo.getState());
    }

    @Test
    void shouldGetAllTodos() {
        // Given
        Todo todo1 = new Todo();
        todo1.setDescription("Todo 1");
        todo1.setCreationDate(LocalDateTime.now());
        todo1.setExpirationDate(LocalDateTime.now().plusDays(1));
        todo1.setCategory("TEST");
        todo1.setState(TodoState.ACTIVE);

        Todo todo2 = new Todo();
        todo2.setDescription("Todo 2");
        todo2.setCreationDate(LocalDateTime.now());
        todo2.setExpirationDate(LocalDateTime.now().plusDays(1));
        todo2.setCategory("TEST");
        todo2.setState(TodoState.ACTIVE);

        todoService.createTodo(todo1);
        todoService.createTodo(todo2);

        // When
        Collection<Todo> todos = todoService.getAllTodos();

        // Then
        assertNotNull(todos);
        assertEquals(2, todos.size());
    }

    @Test
    void shouldReturnNullForNonExistentTodo() {
        // When
        Todo todo = todoService.getTodo(999L);

        // Then
        assertNull(todo);
    }
}