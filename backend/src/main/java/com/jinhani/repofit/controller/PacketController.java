package com.jinhani.repofit.controller;

import jakarta.validation.Valid; //→ 변환된 CreatePacketRequest의 검증 규칙 실행

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jinhani.repofit.dto.CreatePacketRequest;
import com.jinhani.repofit.service.PacketService;

@RestController //// HTTP 요청을 처리하고 반환값을 응답 본문으로 보냄

public class PacketController {

    private final PacketService packetService;

    public PacketController(PacketService packetService) {
        this.packetService = packetService;
    }

    @PostMapping("/api/packets/preview")
    public CreatePacketRequest preview(
        @Valid @RequestBody CreatePacketRequest request
    ) {
        return packetService.createPreview(request);
    }
}