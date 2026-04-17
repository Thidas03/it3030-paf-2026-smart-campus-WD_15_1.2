package com.smartcampus.controller;

import com.smartcampus.model.Role;
import com.smartcampus.model.User;
import com.smartcampus.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/admin/users")
public class AdminUserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminUserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/technician")
    public ResponseEntity<?> createTechnician(@RequestBody CreateUserRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Collections.singleton(Role.TECHNICIAN))
                .build();

        userRepository.save(user);

        return ResponseEntity.ok("Technician created successfully");
    }

    @GetMapping("/technicians")
    public ResponseEntity<java.util.List<User>> getAllTechnicians() {
        return ResponseEntity.ok(userRepository.findByRolesContains(Role.TECHNICIAN));
    }

    @GetMapping
    public ResponseEntity<java.util.List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRolesAsString()
                )).toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UpdateUserRequest request) {
        return userRepository.findById(id).map(user -> {
            user.setName(request.getName());
            if (request.getRoles() != null && !request.getRoles().isEmpty()) {
                java.util.Set<Role> newRoles = request.getRoles().stream()
                        .map(Role::valueOf)
                        .collect(java.util.stream.Collectors.toSet());
                user.setRoles(newRoles);
            }
            userRepository.save(user);
            return ResponseEntity.ok("User updated successfully");
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        if (!userRepository.existsById(id)) return ResponseEntity.notFound().build();
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    @Data
    @AllArgsConstructor
    public static class UserResponseDTO {
        private String id;
        private String name;
        private String email;
        private java.util.Set<String> roles;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CreateUserRequest {
        private String name;
        private String email;
        private String password;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpdateUserRequest {
        private String name;
        private java.util.Set<String> roles;
    }
}
