import type { GitHubRepoSummary, PackageJsonInfo, RepoEvidence } from "../../types/repo";

function mapPackageNameToSkill(packageName: string): string | null {
    const normalizedName = packageName.toLowerCase();

    const packageSkillMap: Record<string, string> = {
        react: "React",
        typescript: "TypeScript",
        vite: "Vite",
        vitest: "Vitest",
        zustand: "Zustand",
        zod: "Zod",
        "@supabase/supabase-js": "Supabase",
        "@tanstack/react-query": "TanStack Query",
        "react-hook-form": "React Hook Form",
    };

    return packageSkillMap[normalizedName] ?? null;
}

export function buildRepoEvidence(
    repoSummary: GitHubRepoSummary,
    readmeText: string | null,
    packageInfo: PackageJsonInfo | null,
): RepoEvidence {
    const packageDependencies = packageInfo ? [...packageInfo.dependencies, ...packageInfo.devDependencies] : [];

    const detectedSkills = new Set<string>();

    if (repoSummary.language) {
        detectedSkills.add(repoSummary.language);
    }

    for (const packageName of packageDependencies) {
        const skill = mapPackageNameToSkill(packageName);

        if (skill) {
            detectedSkills.add(skill);
        }
    }

    return {
        repoFullName: repoSummary.fullName,
        hasDescription: Boolean(repoSummary.description?.trim()),
        hasHomepage: Boolean(repoSummary.homepage?.trim()),
        hasReadme: Boolean(readmeText?.trim()),
        readmeText: readmeText ?? "",
        packageDependencies,
        detectedSkills: Array.from(detectedSkills),
    };
}
