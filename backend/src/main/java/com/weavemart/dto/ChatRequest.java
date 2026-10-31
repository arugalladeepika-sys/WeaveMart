package com.weavemart.dto;

public class ChatRequest {
    private String message;
    private String language;
    private Long userId;
    private String userRole;

    public ChatRequest() {}

    public ChatRequest(String message, String language, Long userId, String userRole) {
        this.message = message;
        this.language = language;
        this.userId = userId;
        this.userRole = userRole;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
}
