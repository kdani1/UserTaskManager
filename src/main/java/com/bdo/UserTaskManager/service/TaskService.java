package com.bdo.UserTaskManager.service;

import com.bdo.UserTaskManager.model.Task;
import com.bdo.UserTaskManager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    // Create a new task
    public Task createTask(Task task) {
        if (task.getUserId() == null || task.getDescription() == "" || task.getTitle() == "") {
            throw new RuntimeException("User ID is required");
        }
        return taskRepository.save(task);
    }

    // Get a task by ID
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    // Get all tasks that are not soft deleted
    public List<Task> getAllTasks() {
        return taskRepository.findAllByIsDeletedFalse();
    }

    // Update a task
    public Task updateTask(Long id, Task taskDetails) {
        if (taskDetails.getUserId() == null || taskDetails.getDescription() == "" || taskDetails.getTitle() == "") {
            throw new RuntimeException("User ID is required");
        }
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        return taskRepository.save(task);
    }
// Restore a task by marking it as not deleted
    public void restoreTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setDeleted(false);
        taskRepository.save(task);
    }
    // Soft delete a task by marking it as deleted
    public void softDeleteTask(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setDeleted(true);
        taskRepository.save(task);
    }
}
