export type CreatePacketPreviewRequest = {
    companyName: string;
    jobPostingText: string;
};

export type CreatePacketPreviewResponse = {
    companyName: string;
    jobPostingText: string;
    jobPostingLength: number;
};

export async function createPacketPreview(request: CreatePacketPreviewRequest): Promise<CreatePacketPreviewResponse> {
    const response = await fetch("http://localhost:8080/api/packets/preview", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error("패킷 미리보기 요청에 실패했습니다.");
    }

    return response.json();
}
