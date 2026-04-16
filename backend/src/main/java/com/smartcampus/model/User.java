package com.smartcampus.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collections;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String picture;
    private String password;
    private String oauth2Id;

    private Set<Role> roles;

    // Helper to get roles as strings
    public Set<String> getRolesAsString() {
        if (roles == null) return Collections.emptySet();
        return roles.stream().map(Enum::name).collect(java.util.stream.Collectors.toSet());
    }
}
