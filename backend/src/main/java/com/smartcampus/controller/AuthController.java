package com.smartcampus.controller;

import com.smartcampus.model.Role;
import com.smartcampus.model.User;
import com.smartcampus.repository.UserRepository;
import com.smartcampus.security.JwtService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword() != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String token = jwtService.generateToken(user.getEmail(), user.getRolesAsString());
                
                Map<String, Object> response = new HashMap<>();
                response.put("token", token);
                response.put("user", buildUserPayload(user));
                
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(401).body("Invalid email or password");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        if (userRepository.findByEmail(signupRequest.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
        }

        Role assignedRole = resolveRole(signupRequest.getRole());

        User user = User.builder()
                .name(signupRequest.getName())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .roles(Collections.singleton(assignedRole))
                .build();

        userRepository.save(user);
        
        String token = jwtService.generateToken(user.getEmail(), user.getRolesAsString());
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", buildUserPayload(user));
        
        return ResponseEntity.ok(response);
    }

    private Map<String, Object> buildUserPayload(User user) {
        Map<String, Object> payload = new HashMap<>();
        payload.put("id", user.getId());
        payload.put("name", user.getName());
        payload.put("email", user.getEmail());
        payload.put("picture", user.getPicture());
        payload.put("roles", user.getRolesAsString());
        return payload;
    }

    private Role resolveRole(String requestedRole) {
        if (requestedRole == null || requestedRole.isBlank()) {
            return Role.USER;
        }

        if ("STUDENT".equalsIgnoreCase(requestedRole)) {
            return Role.USER;
        }

        try {
            return Role.valueOf(requestedRole.toUpperCase());
        } catch (IllegalArgumentException ex) {
            return Role.USER;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SignupRequest {
        private String name;
        private String email;
        private String password;
        private String role;
    }
}
