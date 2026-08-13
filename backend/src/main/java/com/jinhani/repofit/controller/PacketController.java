package com.jinhani.repofit.controller;

import jakarta.validation.Valid; //→ 변환된 CreatePacketRequest의 검증 규칙 실행

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jinhani.repofit.dto.CreatePacketRequest;
import com.jinhani.repofit.service.PacketService;
import com.jinhani.repofit.dto.CreatePacketPreviewResponse;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.jinhani.repofit.dto.CreatePacketResponse;


@RestController //// HTTP 요청을 처리하고 반환값을 응답 본문으로 보냄
@CrossOrigin(origins = "http://localhost:5173") //다른 origin에서 이 Controller에 접근하는 것을 허용

public class PacketController {

    // Controller가 PacketService를 사용할 수 있도록 보관
    private final PacketService packetService;

    // Spring이 PacketService를 넣어줌
    // → 생성자 주입
    public PacketController(PacketService packetService) {
        this.packetService = packetService;
    }


    // POST /api/packets/preview 요청이 들어오면 이 메서드 실행
    // → DB에는 저장하지 않고 미리보기 결과만 반환
    @PostMapping("/api/packets/preview")
    public CreatePacketPreviewResponse preview(
        @Valid @RequestBody CreatePacketRequest request
    ) {
        return packetService.createPreview(request);
    }


    // POST /api/packets 요청이 들어오면 이 메서드 실행
    // → Service의 create()를 호출해서 DB에 실제 저장
    @PostMapping("/api/packets")
    public CreatePacketResponse create(
        @Valid @RequestBody CreatePacketRequest request
    ) {
        return packetService.create(request);
    }
}