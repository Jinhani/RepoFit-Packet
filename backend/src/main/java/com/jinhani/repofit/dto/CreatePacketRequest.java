package com.jinhani.repofit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;







 
public record CreatePacketRequest(

    @NotBlank(message = "회사명은 필수입니다.")
    @Size(max = 100, message = "회사명은 100자 이하여야 합니다.")
    String companyName,

    @NotBlank(message = "채용공고 내용은 필수입니다.")
    @Size(max = 20000, message = "채용공고 내용은 20000자 이하여야 합니다.")
    String jobPostingText

) {
}

// CreatePacketRequest라는 데이터용 타입을 만든다는 뜻이야.

// String companyName,
// String jobPostingText

// 이 DTO는 문자열 두 개를 가진다.

//입력
