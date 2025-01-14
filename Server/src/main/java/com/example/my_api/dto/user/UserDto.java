package com.example.my_api.dto.user;

import com.example.my_api.enums.Role;

public class UserDto {

    private String user_id;
    private String username;
    private Role role;
    private Integer roleCode;

    public UserDto(String user_id, String username, Role role, Integer roleCode) {
        this.user_id = user_id;
        this.username = username;
        this.role = role;
        this.roleCode = roleCode;

    }

    public String getUserId() {
        return user_id;
    }

    public void setUserId(String user_id) {
        this.user_id = user_id;
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
