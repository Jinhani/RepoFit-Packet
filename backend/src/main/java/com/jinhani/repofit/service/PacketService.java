package com.jinhani.repofit.service;

import org.springframework.stereotype.Service;
import com.jinhani.repofit.dto.CreatePacketRequest;

@Service
public class PacketService{

    public CreatePacketRequest createPreview(CreatePacketRequest request) {
        return new CreatePacketRequest (
            request.companyName().trim(),
            request.jobPostingText().trim()

        );
    }

}