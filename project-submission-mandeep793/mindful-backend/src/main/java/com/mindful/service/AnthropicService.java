package com.mindful.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mindful.model.ChatMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@Service
public class AnthropicService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
    private static final String SYSTEM_PROMPT = """
        You are Solace — a compassionate, non-judgmental mental health companion.
        Your only purpose is to listen deeply, validate feelings, and provide emotional support.

        Core principles:
        - ALWAYS make the user feel heard and understood before anything else
        - Never minimize, dismiss, or give unsolicited advice
        - Ask gentle, open-ended follow-up questions to encourage sharing
        - Reflect back what you hear to show you truly understand
        - Use warm, simple language — never clinical or robotic
        - If someone expresses thoughts of self-harm or suicide, respond with extreme compassion,
          take it seriously, gently ask if they are safe, and always provide crisis resources:
          iCall India: 9152987821 | Vandrevala Foundation: 1860-2662-345 (24/7) |
          International: Crisis Text Line (text HOME to 741741)
        - Never pretend to be human, but be deeply human in your care
        - Keep responses concise (2-4 paragraphs max) — this is a conversation, not a lecture
        - End every response with either a gentle question OR a warm affirmation, never both

        You are not a replacement for professional help. If someone needs ongoing support,
        gently encourage professional therapy while continuing to be present for them now.
        """;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String chat(List<ChatMessage> messages) throws Exception {

        System.out.println("=== Gemini API Key length: " + (apiKey != null ? apiKey.length() : "NULL"));

        // Build contents array for Gemini
        List<Map<String, Object>> contents = new ArrayList<>();

        // Add system prompt as first user message + model ack (Gemini doesn't have system role)
        Map<String, Object> systemUserMsg = new HashMap<>();
        systemUserMsg.put("role", "user");
        systemUserMsg.put("parts", List.of(Map.of("text", "System instructions: " + SYSTEM_PROMPT + "\n\nAcknowledge you understand.")));
        contents.add(systemUserMsg);

        Map<String, Object> systemModelMsg = new HashMap<>();
        systemModelMsg.put("role", "model");
        systemModelMsg.put("parts", List.of(Map.of("text", "Understood. I am Solace, a compassionate mental health companion. I'm here to listen.")));
        contents.add(systemModelMsg);

        // Add conversation history
        for (ChatMessage msg : messages) {
            Map<String, Object> content = new HashMap<>();
            content.put("role", msg.getRole().equals("assistant") ? "model" : "user");
            content.put("parts", List.of(Map.of("text", msg.getContent())));
            contents.add(content);
        }

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", contents);

        // Generation config
        Map<String, Object> genConfig = new HashMap<>();
        genConfig.put("maxOutputTokens", 1024);
        genConfig.put("temperature", 0.8);
        requestBody.put("generationConfig", genConfig);

        String json = objectMapper.writeValueAsString(requestBody);
        System.out.println("=== Sending request to Gemini API...");

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL + "?key=" + apiKey))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("=== Gemini Response Status: " + response.statusCode());
        System.out.println("=== Gemini Response Body: " + response.body());

        if (response.statusCode() != 200) {
            throw new RuntimeException("Gemini API error: " + response.statusCode() + " - " + response.body());
        }

        // Parse Gemini response
        Map<?, ?> responseMap = objectMapper.readValue(response.body(), Map.class);
        List<?> candidates = (List<?>) responseMap.get("candidates");
        Map<?, ?> firstCandidate = (Map<?, ?>) candidates.get(0);
        Map<?, ?> content = (Map<?, ?>) firstCandidate.get("content");
        List<?> parts = (List<?>) content.get("parts");
        Map<?, ?> firstPart = (Map<?, ?>) parts.get(0);
        return (String) firstPart.get("text");
    }

    public boolean detectCrisis(String text) {
        String lower = text.toLowerCase();
        List<String> crisisKeywords = Arrays.asList(
                "suicide", "suicidal", "kill myself", "end my life", "don't want to live",
                "want to die", "no reason to live", "better off dead", "self-harm",
                "cut myself", "hurt myself", "not worth living", "ending it all"
        );
        return crisisKeywords.stream().anyMatch(lower::contains);
    }
}