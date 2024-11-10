package com.example.my_api.model;

import com.example.my_api.enums.Role;
import com.example.my_api.converter.RoleConverter;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", unique = true, nullable = false)
    private String userId;
    private String username;
    private String password;

    @Convert(converter = RoleConverter.class) // Integrating the RoleConverter
    private Role role;

    public User() {
    }

    public User(String username, String password, Role role, String userId) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

  
    // @Override
    // public String toString() {
    //     return "User{" +
    //             "id=" + id +
    //             ", user_id='" + user_id + '\'' +
    //             ", username='" + username + '\'' +
    //             ", password='" + password + '\'' +
    //             ", role=" + role +
    //             '}';
    // }
}
