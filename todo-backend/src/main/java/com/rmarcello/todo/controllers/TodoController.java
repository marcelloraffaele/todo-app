package com.rmarcello.todo.controllers;

import com.rmarcello.todo.beans.Todo;
import com.rmarcello.todo.services.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/todos")
@Tag(name = "Todo API", description = "API for managing todos")
@CrossOrigin(origins = "*")
public class TodoController {
    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    @Operation(summary = "Get all todos", description = "Returns a list of all todos")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved todos")
    public Collection<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get todo by ID", description = "Returns a todo by its ID")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved todo")
    @ApiResponse(responseCode = "404", description = "Todo not found")
    public ResponseEntity<Todo> getTodo(@PathVariable Long id) {
        Todo todo = todoService.getTodo(id);
        if (todo != null) {
            return ResponseEntity.ok(todo);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @Operation(summary = "Create new todo", description = "Creates a new todo item")
    @ApiResponse(responseCode = "200", description = "Successfully created todo")
    public Todo createTodo(@RequestBody Todo todo) {
        return todoService.createTodo(todo);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update todo", description = "Updates an existing todo")
    @ApiResponse(responseCode = "200", description = "Successfully updated todo")
    @ApiResponse(responseCode = "404", description = "Todo not found")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        Todo updatedTodo = todoService.updateTodo(id, todo);
        if (updatedTodo != null) {
            return ResponseEntity.ok(updatedTodo);
        }
        return ResponseEntity.notFound().build();
    }
}