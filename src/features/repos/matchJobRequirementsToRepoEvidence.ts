import type { JobSkillRequirement } from "../../types/job";
import type { RepoEvidence, SkillMatchStatus } from "../../types/repo";

export function matchJobRequirementsToRepoEvidence(
    requirements: JobSkillRequirement[],
    repoEvidence: RepoEvidence,
): SkillMatch[] {
    return requirements.map((requirement) => ({
        requirement,
        status: repoEvidence.detectedSkills.includes(requirement.skillName) ? "matched" : "missing",
        evidence: [],
    }));
}
