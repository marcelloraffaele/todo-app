package com.rmarcello.todo.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmarcello.todo.beans.Todo;
import com.rmarcello.todo.beans.TodoState;
import com.rmarcello.todo.services.TodoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TodoController.class)
class TodoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TodoService todoService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void whenGetAllTodos_thenReturns200() throws Exception {
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setDescription("Test todo");

        when(todoService.getAllTodos()).thenReturn(Arrays.asList(todo));

        mockMvc.perform(get("/todos"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$[0].id").value(1))
               .andExpect(jsonPath("$[0].description").value("Test todo"));
    }

    @Test
    void whenGetTodoById_thenReturns200() throws Exception {
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setDescription("Test todo");

        when(todoService.getTodoById(1L)).thenReturn(todo);

        mockMvc.perform(get("/todos/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.id").value(1))
               .andExpect(jsonPath("$.description").value("Test todo"));
    }

    @Test
    void whenGetTodoByInvalidId_thenReturns404() throws Exception {
        when(todoService.getTodoById(99L)).thenReturn(null);

        mockMvc.perform(get("/todos/99"))
               .andExpect(status().isNotFound());
    }

    @Test
    void whenCreateTodo_thenReturns200() throws Exception {
        Todo todo = new Todo();
        todo.setDescription("New todo");
        todo.setState(TodoState.ACTIVE);

        when(todoService.createTodo(any(Todo.class))).thenAnswer(i -> {
            Todo input = i.getArgument(0);
            input.setId(1L);
            return input;
        });

        mockMvc.perform(post("/todos")
               .contentType(MediaType.APPLICATION_JSON)
               .content(objectMapper.writeValueAsString(todo)))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.id").exists())
               .andExpect(jsonPath("$.description").value("New todo"));
    }

    @Test
    void whenUpdateTodo_thenReturns200() throws Exception {
        Todo todo = new Todo();
        todo.setId(1L);
        todo.setDescription("Updated todo");
        todo.setState(TodoState.DONE);

        when(todoService.updateTodo(eq(1L), any(Todo.class))).thenReturn(todo);

        mockMvc.perform(put("/todos/1")
               .contentType(MediaType.APPLICATION_JSON)
               .content(objectMapper.writeValueAsString(todo)))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.id").value(1))
               .andExpect(jsonPath("$.description").value("Updated todo"))
               .andExpect(jsonPath("$.state").value("DONE"));
    }

    @Test
    void whenUpdateInvalidTodo_thenReturns404() throws Exception {
        Todo todo = new Todo();
        todo.setId(99L);
        todo.setDescription("Updated todo");

        when(todoService.updateTodo(eq(99L), any(Todo.class))).thenReturn(null);

        mockMvc.perform(put("/todos/99")
               .contentType(MediaType.APPLICATION_JSON)
               .content(objectMapper.writeValueAsString(todo)))
               .andExpect(status().isNotFound());
    }
}