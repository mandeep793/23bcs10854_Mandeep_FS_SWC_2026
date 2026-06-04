package com.mindful.model;

import java.util.List;

public class ChatRequest {
    private List<ChatMessage> messages;
    private String sessionId;

    public ChatRequest() {}

    public List<ChatMessage> getMessages() { return messages; }
    public void setMessages(List<ChatMessage> messages) { this.messages = messages; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }
}
