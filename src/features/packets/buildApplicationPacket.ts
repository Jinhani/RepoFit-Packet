import type { ApplicationPacket, RemediationTask } from "../../types/packet";

export function buildApplicationPacket(
    companyName: string,
    jobTitle: string,
    jobPostingText: string,
    repoUrls: string[],
    remediationTasks: RemediationTask[],
): ApplicationPacket {
    const now = new Date().toISOString();

    return {
        id: crypto.randomUUID(),
        companyName,
        jobTitle,
        jobPostingText,
        status: "draft",
        repoUrls,
        attachments: [],
        notes: "",
        checkItems: [],
        remediationTasks,
        createdAt: now,
        updatedAt: now,
    };
}

// 입력: 회사 이름, 직무명, 공고 내용, 저장소 URL 배열, 보완 작업 배열
// 출력: ApplicationPacket
// 책임: 전달받은 데이터를 패킷 모양으로 조립
// 하면 안 되는 일: fetch, 화면 렌더링, React 상태 변경
