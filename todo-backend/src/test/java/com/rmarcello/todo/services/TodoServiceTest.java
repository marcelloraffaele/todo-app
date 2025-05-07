package com.rmarcello.todo.services;

import com.rmarcello.todo.beans.Todo;
import com.rmarcello.todo.beans.TodoState;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class TodoServiceTest {

    @Autowired
    private TodoService todoService;

    @Test
    void whenCreateTodo_thenTodoIsCreated() {
        Todo todo = new Todo();
        todo.setDescription("Test todo");
        todo.setCategory("Test");
        todo.setState(TodoState.ACTIVE);

        Todo created = todoService.createTodo(todo);

        assertNotNull(created.getId());
        assertEquals("Test todo", created.getDescription());
        assertEquals(TodoState.ACTIVE, created.getState());
    }

    @Test
    void whenGetAllTodos_thenListIsReturned() {
        Todo todo = new Todo();
        todo.setDescription("Test todo");
        todoService.createTodo(todo);

        List<Todo> todos = todoService.getAllTodos();

        assertFalse(todos.isEmpty());
    }

    @Test
    void whenGetTodoById_thenCorrectTodoIsReturned() {
        Todo todo = new Todo();
        todo.setDescription("Test todo");
        Todo created = todoService.createTodo(todo);

        Todo found = todoService.getTodoById(created.getId());

        assertNotNull(found);
        assertEquals(created.getId(), found.getId());
    }

    @Test
    void whenUpdateTodo_thenTodoIsUpdated() {
        Todo todo = new Todo();
        todo.setDescription("Test todo");
        Todo created = todoService.createTodo(todo);

        created.setDescription("Updated todo");
        created.setState(TodoState.DONE);

        Todo updated = todoService.updateTodo(created.getId(), created);

        assertNotNull(updated);
        assertEquals("Updated todo", updated.getDescription());
        assertEquals(TodoState.DONE, updated.getState());
    }
}