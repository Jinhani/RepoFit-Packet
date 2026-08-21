package com.jinhani.repofit.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping("/api/packets/preview")
    public CreatePacketPreviewResponse preview(
        @Valid @RequestBody CreatePacketRequest request
    ) {
        return packetService.createPreview(request);
    }

    @PostMapping("/api/packets")
    public CreatePacketResponse create(
        @Valid @RequestBody CreatePacketRequest request
    ) {
        return packetService.create(request);
    }

    @GetMapping("/api/packets")
    public List<CreatePacketResponse> findAll() {
        return packetService.findAll();
    }

    @GetMapping("/api/packets/{id}")
    public CreatePacketResponse findById(
        @PathVariable Long id
    ) {
        return packetService.findById(id);
    }

    @PutMapping("/api/packets/{id}")
    public CreatePacketResponse updateById(
        @PathVariable Long id,
        @Valid @RequestBody CreatePacketRequest request
    ) {
        return packetService.updateById(id, request);
    }

    @DeleteMapping("/api/packets/{id}")
    public void deleteById(
        @PathVariable Long id
    ) {
        packetService.deleteById(id);
    }
}