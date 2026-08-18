package com.jinhani.repofit.controller;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jinhani.repofit.dto.CreatePacketPreviewResponse;
import com.jinhani.repofit.dto.CreatePacketRequest;
import com.jinhani.repofit.dto.CreatePacketResponse;
import com.jinhani.repofit.service.PacketService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PacketController {

    private final PacketService packetService;

    public PacketController(PacketService packetService) {
        this.packetService = packetService;
    }

    // 패킷 미리보기
    // DB에는 저장하지 않음
    @PostMapping("/api/packets/preview")
    public CreatePacketPreviewResponse preview(
        @Valid @RequestBody CreatePacketRequest request
    ) {
        return packetService.createPreview(request);
    }

    // 패킷 실제 저장
    @PostMapping("/api/packets")
    public CreatePacketResponse create(
        @Valid @RequestBody CreatePacketRequest request
    ) {
        return packetService.create(request);
    }

    // URL의 id를 받아 DB에서 해당 패킷 1개 조회
    // 예: GET /api/packets/1 → id에는 1이 들어옴
    @GetMapping("/api/packets/{id}")
    public CreatePacketResponse findById(
        @PathVariable Long id
    ) {
        return packetService.findById(id);
    }
}