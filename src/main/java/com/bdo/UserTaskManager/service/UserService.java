package com.bdo.UserTaskManager.service;

import com.bdo.UserTaskManager.model.Task;
import com.bdo.UserTaskManager.model.User;
import com.bdo.UserTaskManager.repository.TaskRepository;
import com.bdo.UserTaskManager.repository.UserRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TaskRepository taskRepository;
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Create a new user
    public User createUser(User taskmanageruser) {
        String hashedPassword = passwordEncoder.encode(taskmanageruser.getPassword());
        taskmanageruser.setPassword(hashedPassword);
        return userRepository.save(taskmanageruser);
    }

    // Get a user by ID along with their tasks
    public Optional<User> getUserByIdWithTasks(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent() && !user.get().isDeleted()) {
            Hibernate.initialize(user.get().getTasks());
            return user;
        }
        return Optional.empty(); // Return empty if user is not found or soft deleted
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAllByIsDeletedFalse();
    }

    // Update a user
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        String hashedPassword = passwordEncoder.encode(userDetails.getPassword());
        user.setPassword(hashedPassword);
        user.setAddress(userDetails.getAddress());
        return userRepository.save(user);
    }
    //Restore a user
    public void restoreUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setDeleted(false);
        userRepository.save(user);

        // Optionally, restore user's tasks
        // ...
    }
    //Soft Delete a user
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setDeleted(true);
        userRepository.save(user);

        // Soft delete user's tasks
        List<Task> userTasks = taskRepository.findByTaskmanageruser_Id(userId);
        userTasks.forEach(task -> {
            task.setDeleted(true);
            taskRepository.save(task);
        });
    }
}
