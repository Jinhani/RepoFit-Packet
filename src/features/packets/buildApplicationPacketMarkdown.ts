import type { ApplicationPacket } from "../../types/packet";

export function buildApplicationPacketMarkdown(packet: ApplicationPacket): string {
    const repoSection =
        packet.repoUrls.length === 0 ? "- 없음" : packet.repoUrls.map((repoUrl) => `- ${repoUrl}`).join("\n");

    const notesSection = packet.notes.trim() === "" ? "작성된 메모가 없습니다." : packet.notes;
    const skillMatchSection =
        packet.skillMatches.length === 0
            ? "- 분석 결과 없음"
            : packet.skillMatches
                  .map((match) => {
                      let result = "보완 필요";

                      if (match.status === "matched") {
                          result = "충족";
                      } else if (match.status === "partial") {
                          result = "부분 충족";
                      }

                      return `- ${match.requirement.skill}: ${result}`;
                  })
                  .join("\n");
    const taskSection =
        packet.remediationTasks.length === 0
            ? "- 보완 작업 없음"
            : packet.remediationTasks
                  .map((task) => {
                      const checkbox = task.status === "done" ? "[x]" : "[ ]";

                      return [
                          `- ${checkbox} ${task.title}`,
                          `  - 우선순위: ${task.priority}`,
                          `  - 설명: ${task.description}`,
                      ].join("\n");
                  })
                  .join("\n");

    const jobPostingUrlLine = packet.jobPostingUrl === undefined ? "" : `- 채용공고 URL: ${packet.jobPostingUrl}\n`;

    return `# ${packet.companyName} - ${packet.jobTitle}

## 지원 정보

- 상태: ${packet.status}
- 생성일: ${packet.createdAt}
- 수정일: ${packet.updatedAt}
${jobPostingUrlLine}
## 채용공고

${packet.jobPostingText}

## GitHub 저장소

${repoSection}

## 지원 메모

${notesSection}

## 기술 매칭 결과

${skillMatchSection}

## 보완 작업

${taskSection}
`;
}
