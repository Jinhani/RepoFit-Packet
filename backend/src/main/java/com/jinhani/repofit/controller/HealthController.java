package com.jinhani.repofit.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, String> health() {
        return Map.of(
            "status", "UP",
            "message", "RepoFit backend is running"
        );
    }

    @GetMapping("/api/version")
    public Map<String, String> version () {

return Map.of(
    "name", "RepoFit Packet",
    "version", "0.1"
);

    }
}