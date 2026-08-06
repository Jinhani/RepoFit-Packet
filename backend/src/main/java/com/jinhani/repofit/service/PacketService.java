package com.jinhani.repofit.service;

import org.springframework.stereotype.Service;

import com.jinhani.repofit.dto.CreatePacketPreviewResponse;
import com.jinhani.repofit.dto.CreatePacketRequest;

@Service
public class PacketService {

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
}