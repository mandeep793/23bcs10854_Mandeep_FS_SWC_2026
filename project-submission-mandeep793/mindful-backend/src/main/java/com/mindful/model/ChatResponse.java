package com.mindful.model;

public class ChatResponse {
    private String message;
    private boolean crisisDetected;
    private String sessionId;

    public ChatResponse() {}

    public ChatResponse(String message, boolean crisisDetected, String sessionId) {
        this.message = message;
        this.crisisDetected = crisisDetected;
        this.sessionId = sessionId;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public boolean isCrisisDetected() { return crisisDetected; }
    public void setCrisisDetected(boolean crisisDetected) { this.crisisDetected = crisisDetected; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
}
