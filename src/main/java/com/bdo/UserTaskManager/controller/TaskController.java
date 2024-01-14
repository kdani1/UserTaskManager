package com.bdo.UserTaskManager.controller;

import com.bdo.UserTaskManager.model.Task;
import com.bdo.UserTaskManager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Create a new task
    @PostMapping("/")
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    // Get a task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable(value = "id") Long taskId) {
        Task task = taskService.getTaskById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return ResponseEntity.ok().body(task);
    }

    // Get all tasks
    @GetMapping("/")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Update a task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable(value = "id") Long taskId, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(taskId, taskDetails);
        return ResponseEntity.ok(updatedTask);
    }
    // Restore a task
    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restoreTask(@PathVariable(value = "id") Long taskId) {
        taskService.restoreTask(taskId);
        return ResponseEntity.ok().build(); // You can customize the response as needed
    }
    // Delete a task (soft delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDeleteTask(@PathVariable(value = "id") Long taskId) {
        taskService.softDeleteTask(taskId);
        return ResponseEntity.ok().build();
    }
}
