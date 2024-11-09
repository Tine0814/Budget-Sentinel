package com.example.my_api.dto.user;

import com.example.my_api.enums.Role;

public class UserDto {

    private Long id;
    private String username;
    private Role role;
    private Integer roleCode;

    public UserDto(Long id, String username, Role role, Integer roleCode) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.roleCode = roleCode;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getRole(){
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    public Integer getRoleCode(){
        return roleCode;
    }

    public void setRoleCode(Integer roleCode) {
        this.roleCode =roleCode;
    }
}
