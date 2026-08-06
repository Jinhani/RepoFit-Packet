package com.jinhani.repofit.dto;

public record CreatePacketPreviewResponse(
    String companyName,
    String jobPostingText,
    int jobPostingLength
) {
};

//출력