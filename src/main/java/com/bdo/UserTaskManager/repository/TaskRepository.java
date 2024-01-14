package com.bdo.UserTaskManager.repository;

import com.bdo.UserTaskManager.model.Task;
import com.bdo.UserTaskManager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByIsDeletedFalse();
    List<Task> findByTaskmanageruser_Id(Long userId);
}
