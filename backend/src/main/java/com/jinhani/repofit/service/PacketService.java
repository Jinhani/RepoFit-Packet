package com.jinhani.repofit.service;

import org.springframework.stereotype.Service;

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
}