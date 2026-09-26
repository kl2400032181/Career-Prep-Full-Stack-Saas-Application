package com.careerprepai.dto.auth;

public class LoginResponse {

    private Long id;
    private String name;
    private String email;
    private String token;
    private String message;

    public LoginResponse() {
    }

    public LoginResponse(Long id, String name, String email,
                         String token, String message) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.token = token;
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}