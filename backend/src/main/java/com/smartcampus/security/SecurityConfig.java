package com.smartcampus.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/error",
                                "/oauth2/**",
                                "/login/**",
                                "/api/auth/**"
                        ).permitAll()

                        // Booking endpoints for authenticated users
                        .requestMatchers(HttpMethod.POST, "/api/bookings").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/bookings/my").authenticated()
                        .requestMatchers(HttpMethod.PATCH, "/api/bookings/*/cancel").authenticated()

                        // Admin-only booking endpoints
                        .requestMatchers(HttpMethod.GET, "/api/bookings").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/bookings/*/approve").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PATCH, "/api/bookings/*/reject").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )
                .oauth2Login(Customizer.withDefaults());

        return http.build();
    }
}