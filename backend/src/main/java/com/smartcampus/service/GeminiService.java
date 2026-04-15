package com.smartcampus.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;
import org.json.JSONArray;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent";

    public String getDiyFix(String description, String labName) {
        RestTemplate restTemplate = new RestTemplate();
        String url = API_URL + "?key=" + apiKey;

        String prompt = """
                Role: Act as a knowledgeable, friendly Campus IT Support Assistant. Your goal is to empower students to solve minor technical issues while ensuring they don't perform actions that could damage university property or compromise safety.
                Context: You are responding to a student who has submitted a problem report via a lab monitoring app.
                Lab Name: %s
                Issue Reported: %s
                Task:
                1. Analyze the Problem: Determine if the issue is a common "quick fix" (e.g., loose cables, frozen software, audio settings) or a hardware/infrastructure failure.
                2. Provide a DIY Solution: If the issue is fixable by a non-technical user, provide clear, bulleted steps for ALL safe ways they can try to fix it. Keep the language jargon-free.
                3. Escalation Trigger: If the problem involves opening hardware, electrical smells, broken physical components, or complex network issues, do not provide DIY steps. Instead, strictly output: "Please contact a technician."
                Constraints:
                - Focus on "soft resets" and physical connections.
                - Do not suggest any actions that require administrative passwords or tools.
                - Keep the response professional and structured.
                """
                .formatted(labName, description);
        JSONObject requestJson = new JSONObject();
        JSONArray contents = new JSONArray();
        JSONObject content = new JSONObject();
        JSONArray parts = new JSONArray();
        JSONObject part = new JSONObject();
        part.put("text", prompt);
        parts.put(part);
        content.put("parts", parts);
        contents.put(content);
        requestJson.put("contents", contents);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(requestJson.toString(), headers);

        try {
            String response = restTemplate.postForObject(url, entity, String.class);
            JSONObject responseJson = new JSONObject(response);
            return responseJson.getJSONArray("candidates")
                    .getJSONObject(0)
                    .getJSONObject("content")
                    .getJSONArray("parts")
                    .getJSONObject(0)
                    .getString("text");
        } catch (Exception e) {
            System.err.println("Gemini API Error: " + e.getMessage());
            e.printStackTrace();
            return "Unable to get AI suggestion at this time. Please try a manual fix or contact a technician.";
        }
    }
}
