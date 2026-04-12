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

    private final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

    public String getDiyFix(String description, String labName) {
        RestTemplate restTemplate = new RestTemplate();
        String url = API_URL + "?key=" + apiKey;

        String prompt = "A user reported a problem in campus lab '" + labName + "': '" + description + 
                        "'. Provide a short, easy-to-follow DIY fix suggestion for the user to try. " +
                        "If it cannot be fixed by a student, say 'Please contact a technician.'";

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
            return "Unable to get AI suggestion at this time. Please try a manual fix or contact a technician.";
        }
    }
}
