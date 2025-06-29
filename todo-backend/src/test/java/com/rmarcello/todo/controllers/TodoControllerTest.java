package com.rmarcello.todo.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmarcello.todo.beans.Todo;
import com.rmarcello.todo.services.TodoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class TodoControllerTest {
    private MockMvc mockMvc;

    @Mock
    private TodoService todoService;

    @InjectMocks
    private TodoController todoController;

    private Todo todo;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(todoController).build();
        todo = new Todo(1L, "Test", LocalDate.now(), LocalDate.now().plusDays(1), "work", Todo.State.ACTIVE);
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new com.fasterxml.jackson.datatype.jsr310.JavaTimeModule());
    }

    @Test
    void testGetAllTodos() throws Exception {
        given(todoService.getAllTodos()).willReturn(Arrays.asList(todo));
        mockMvc.perform(get("/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description").value("Test"));
    }

    @Test
    void testAddTodo() throws Exception {
        given(todoService.addTodo(any(Todo.class))).willReturn(todo);
        mockMvc.perform(post("/todos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(todo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Test"));
    }

    @Test
    void testGetTodoById() throws Exception {
        given(todoService.getTodoById(1L)).willReturn(Optional.of(todo));
        mockMvc.perform(get("/todos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Test"));
    }

    @Test
    void testGetTodoByIdNotFound() throws Exception {
        given(todoService.getTodoById(2L)).willReturn(Optional.empty());
        mockMvc.perform(get("/todos/2"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testUpdateTodo() throws Exception {
        given(todoService.updateTodo(eq(1L), any(Todo.class))).willReturn(Optional.of(todo));
        mockMvc.perform(put("/todos/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(todo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Test"));
    }

    @Test
    void testUpdateTodoNotFound() throws Exception {
        given(todoService.updateTodo(eq(2L), any(Todo.class))).willReturn(Optional.empty());
        mockMvc.perform(put("/todos/2")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(todo)))
                .andExpect(status().isNotFound());
    }
}
