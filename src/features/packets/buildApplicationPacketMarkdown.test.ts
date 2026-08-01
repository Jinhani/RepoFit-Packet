import { describe, expect, it } from "vitest";
import type { ApplicationPacket } from "../../types/packet";
import { buildApplicationPacketMarkdown } from "./buildApplicationPacketMarkdown";

const todoPacket: ApplicationPacket = {
    id: "packet-1",
    companyName: "데모 회사",
    jobTitle: "프론트엔드 개발자",
    jobPostingText: "React 경험 필수",
    status: "draft",
    repoUrls: ["https://github.com/octocat/Hello-World"],
    attachments: [],
    notes: "",
    checkItems: [],
    skillMatches: [],
    remediationTasks: [
        {
            id: "task-1",
            title: "React 보완하기",
            description: "React 관련 증거가 부족합니다.",
            priority: "high",
            status: "todo",
        },
    ],
    createdAt: "2026-07-30T00:00:00.000Z",
    updatedAt: "2026-07-30T00:00:00.000Z",
};

describe("buildApplicationPacketMarkdown", () => {
    it("todo 작업을 선택되지 않은 체크박스로 변환한다", () => {
        const markdown = buildApplicationPacketMarkdown(todoPacket);

        expect(markdown).toContain("- [ ] React 보완하기");
    });

    it("done 작업을 선택된 체크박스로 변환한다", () => {
        const donePacket: ApplicationPacket = {
            ...todoPacket,
            remediationTasks: todoPacket.remediationTasks.map((task) => ({
                ...task,
                status: "done" as const,
            })),
        };

        const markdown = buildApplicationPacketMarkdown(donePacket);

        expect(markdown).toContain("- [x] React 보완하기");
    });
});

// 기존 todoPacket을 변경하지 않기 위해 spread와 map()으로 새 패킷을 만들고 작업 상태만 done으로 덮어쓰기
