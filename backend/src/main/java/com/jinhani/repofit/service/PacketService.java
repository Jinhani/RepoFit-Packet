package com.jinhani.repofit.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jinhani.repofit.dto.CreatePacketPreviewResponse;
import com.jinhani.repofit.dto.CreatePacketRequest;
import com.jinhani.repofit.dto.CreatePacketResponse;
import com.jinhani.repofit.entity.PacketEntity;
import com.jinhani.repofit.repository.PacketRepository;

@Service
public class PacketService {

    private final PacketRepository packetRepository;

    public PacketService(PacketRepository packetRepository) {
        this.packetRepository = packetRepository;
    }

    public CreatePacketPreviewResponse createPreview(
        CreatePacketRequest request
    ) {
        String companyName = request.companyName().trim();
        String jobPostingText = request.jobPostingText().trim();

        return new CreatePacketPreviewResponse(
            companyName,
            jobPostingText,
            jobPostingText.length()
        );
    }

    public CreatePacketResponse create(
        CreatePacketRequest request
    ) {
        String companyName = request.companyName().trim();
        String jobPostingText = request.jobPostingText().trim();

        PacketEntity packet = new PacketEntity(
            companyName,
            jobPostingText
        );

        PacketEntity savedPacket = packetRepository.save(packet);

        return new CreatePacketResponse(
            savedPacket.getId(),
            savedPacket.getCompanyName(),
            savedPacket.getJobPostingText()
        );
    }

    // id로 패킷 1개 조회
    public CreatePacketResponse findById(Long id) {
        PacketEntity packet = packetRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "패킷을 찾을 수 없습니다."
            ));

        return new CreatePacketResponse(
            packet.getId(),
            packet.getCompanyName(),
            packet.getJobPostingText()
        );
    }
}