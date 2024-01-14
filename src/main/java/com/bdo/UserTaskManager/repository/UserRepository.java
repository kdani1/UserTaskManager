package com.bdo.UserTaskManager.repository;

import com.bdo.UserTaskManager.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAllByIsDeletedFalse();
}
