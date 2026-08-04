package com.jinhani.repofit.controller;

import jakarta.validation.Valid; //→ 변환된 CreatePacketRequest의 검증 규칙 실행

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jinhani.repofit.dto.CreatePacketRequest;

@RestController //→ JSON을 CreatePacketRequest로 변환
public class PacketController {

    @PostMapping("/api/packets/preview")
    public CreatePacketRequest preview(
        @Valid @RequestBody CreatePacketRequest request
    ) {
        return request;
    }
}