package com.smartcampus.controller;

import com.smartcampus.model.Role;
import com.smartcampus.model.User;
import com.smartcampus.repository.UserRepository;
import com.smartcampus.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable String id, @RequestBody Set<Role> roles) {
        return userRepository.findById(id).map(user -> {
            user.setRoles(roles);
            userRepository.save(user);
            
            // Check if TECHNICIAN was added
            if (roles.contains(Role.TECHNICIAN)) {
                notificationService.createNotification(
                    user.getId(),
                    "You have been assigned as a TECHNICIAN",
                    "ROLE_CHANGE",
                    null
                );
            }
            
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.notFound().build());
    }
}
