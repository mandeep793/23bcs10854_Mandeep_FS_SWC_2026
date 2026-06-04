package com.mindful.controller;

import com.mindful.model.ChatRequest;
import com.mindful.model.ChatResponse;
import com.mindful.service.AnthropicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private AnthropicService anthropicService;

    @PostMapping("/message")
    public ResponseEntity<ChatResponse> sendMessage(@RequestBody ChatRequest request) {
        try {
            String latestUserMessage = "";
            if (request.getMessages() != null && !request.getMessages().isEmpty()) {
                for (int i = request.getMessages().size() - 1; i >= 0; i--) {
                    if ("user".equals(request.getMessages().get(i).getRole())) {
                        latestUserMessage = request.getMessages().get(i).getContent();
                        break;
                    }
                }
            }

            boolean crisisDetected = anthropicService.detectCrisis(latestUserMessage);
            String aiResponse = anthropicService.chat(request.getMessages());

            String sessionId = request.getSessionId() != null
                    ? request.getSessionId()
                    : UUID.randomUUID().toString();

            return ResponseEntity.ok(new ChatResponse(aiResponse, crisisDetected, sessionId));

        } catch (Exception e) {
            // Print full error to IntelliJ console
            System.err.println("=== ERROR in /api/chat/message ===");
            System.err.println("Message: " + e.getMessage());
            e.printStackTrace();

            return ResponseEntity.internalServerError()
                    .body(new ChatResponse(
                            "I'm having trouble connecting right now. Please try again in a moment.",
                            false, null));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Solace backend is running");
    }
}