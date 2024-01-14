package com.bdo.UserTaskManager.controller;

import com.bdo.UserTaskManager.model.User;
import com.bdo.UserTaskManager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Create a new user
    @PostMapping("/")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Get a user by ID along with their tasks
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long userId) {
        User user = userService.getUserByIdWithTasks(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok().body(user);
    }

    // Get all users
    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Update a user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(userId, userDetails);
        return ResponseEntity.ok(updatedUser);
    }
    // Restore User
    @PutMapping("/{id}/restore")
    public ResponseEntity<?> restoreUser(@PathVariable Long id) {
        userService.restoreUser(id);
        return ResponseEntity.ok().build();
    }
    // Soft Delete a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable(value = "id") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }
}
