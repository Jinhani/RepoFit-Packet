import type { JobSkillRequirement } from "./job";

export type GitHubRepoSummary = {
    id: number;
    owner: string;
    name: string;
    fullName: string;
    description: string | null;
    htmlUrl: string;
    homepage: string | null;
    language: string | null;
    updatedAt: string;
};

export type EvidenceSource = "repo_metadata" | "readme" | "package_json" | "manual_note" | "user_confirmed";

export type RepoEvidence = {
    repoFullName: string;
    hasDescription: boolean;
    hasHomepage: boolean;
    hasReadme: boolean;
    readmeText?: string;
    packageDependencies: string[];
    detectedSkills: string[];
};

export type SkillMatchStatus = "matched" | "partial" | "missing";

export type SkillEvidence = {
    source: EvidenceSource;
    text: string;
};

export type SkillMatch = {
    requirement: JobSkillRequirement;
    status: SkillMatchStatus;
    evidence: string[];
    recommendation?: string;
};
