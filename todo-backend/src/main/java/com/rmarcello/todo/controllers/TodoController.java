package com.rmarcello.todo.controllers;

import com.rmarcello.todo.beans.Todo;
import com.rmarcello.todo.services.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@Tag(name = "Todo", description = "Todo management APIs")
@CrossOrigin
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    @Operation(summary = "Get all todos", description = "Retrieves a list of all todos")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved todos")
    public ResponseEntity<List<Todo>> getAllTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a todo by ID", description = "Retrieves a specific todo by its ID")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved todo")
    @ApiResponse(responseCode = "404", description = "Todo not found")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        Todo todo = todoService.getTodoById(id);
        if (todo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(todo);
    }

    @PostMapping
    @Operation(summary = "Create a new todo", description = "Creates a new todo item")
    @ApiResponse(responseCode = "200", description = "Successfully created todo")
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.createTodo(todo));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a todo", description = "Updates an existing todo by its ID")
    @ApiResponse(responseCode = "200", description = "Successfully updated todo")
    @ApiResponse(responseCode = "404", description = "Todo not found")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @Valid @RequestBody Todo todo) {
        Todo updatedTodo = todoService.updateTodo(id, todo);
        if (updatedTodo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedTodo);
    }
}