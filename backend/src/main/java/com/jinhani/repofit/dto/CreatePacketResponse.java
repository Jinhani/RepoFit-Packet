package com.jinhani.repofit.dto;

public record CreatePacketResponse(
    Long id,
    String companyName,
    String jobPostingText
) {
}