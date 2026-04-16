package com.smartcampus.security;

import com.smartcampus.model.Role;
import com.smartcampus.model.User;
import com.smartcampus.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${app.cors.allowed-origins}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");
        String oauth2Id = oAuth2User.getName();

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .name(name)
                    .picture(picture)
                    .oauth2Id(oauth2Id)
                    .roles(Collections.singleton(Role.USER)) // Default role
                    .build();
            return userRepository.save(newUser);
        });

        // Update name/picture if changed
        user.setName(name);
        user.setPicture(picture);
        userRepository.save(user);

        Set<String> roles = user.getRolesAsString();
        String token = jwtService.generateToken(email, roles);

        String targetUrl = frontendUrl + "/auth/callback?token=" + token + "&email=" + email + "&name=" + name + "&picture=" + picture + "&roles=" + String.join(",", roles);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
