import type { RemediationTask } from "../../types/packet";
import type { SkillMatch } from "../../types/repo";

export function buildRemediationTasksFromMatches(matches: SkillMatch[]): RemediationTask[] {
    return matches
        .filter((match) => match.status === "missing")
        .map((match) => ({
            id: `remediation-${match.requirement.skill}`,
            title: `${match.requirement.skill} 보완하기`,
            description: `${match.requirement.skill} 관련 증거가 부족합니다. README, 기능 구현, 테스트 코드 등으로 보완하세요.`,
            priority: match.requirement.importance === "required" ? "high" : "medium",
            status: "todo",
        }));
}
