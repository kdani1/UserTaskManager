package com.bdo.UserTaskManager.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.hibernate.annotations.Proxy;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "taskmanageruser")
@Proxy(lazy = false)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password; // Consider storing a hashed version of the password

    @Embedded
    private Address address;
    @Column(name = "is_deleted")
    private boolean isDeleted;
    @OneToMany(mappedBy = "taskmanageruser", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Task> tasks = new HashSet<>();
    // Inner class for a simplified task representation
    public static class SimpleTask {
        private Long id;
        private String title;
        private String description;

        public SimpleTask(Long id, String title, String description) {
            this.id = id;
            this.title = title;
            this.description = description;
        }

        // Getters
        public Long getId() { return id; }
        public String getTitle() { return title; }
        public String getDescription() { return description; }
    }

    // Method to get simplified task representations
    public Set<SimpleTask> getSimpleTasks() {
        return this.tasks.stream()
                .filter(task -> !task.isDeleted()) // Add this line to filter out deleted tasks
                .map(task -> new SimpleTask(task.getId(), task.getTitle(), task.getDescription()))
                .collect(Collectors.toSet());
    }

    // Standard getters and setters
    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    // Method to add task to the user
    public void addTask(Task task) {
        tasks.add(task);
        task.setUser(this);
    }
    public Set<Long> getTaskIds() {
        return this.tasks.stream().map(Task::getId).collect(Collectors.toSet());
    }
    // Method to remove task from the user
    public void removeTask(Task task) {
        tasks.remove(task);
        task.setUser(null);
    }
}
