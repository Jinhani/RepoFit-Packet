import type { JobSkillRequirement, RequirementImportance } from "../../types/job";
import { skillDictionary } from "./skillDictionary";

function detectImportance(jobText: string, alias: string): RequirementImportance {
    const lowerText = jobText.toLowerCase();
    const lowerAlias = alias.toLowerCase();

    const aliasIndex = lowerText.indexOf(lowerAlias);

    if (aliasIndex === -1) {
        return "mentioned";
    }

    const nearText = lowerText.slice(Math.max(0, aliasIndex - 30), aliasIndex + lowerAlias.length + 30);

    if (nearText.includes("우대") || nearText.includes("preferred") || nearText.includes("plus")) {
        return "preferred";
    }

    if (
        nearText.includes("필수") ||
        nearText.includes("필요") ||
        nearText.includes("required") ||
        nearText.includes("경험")
    ) {
        return "required";
    }

    return "mentioned";
}

export function extractJobSkillRequirements(jobPostingText: string): JobSkillRequirement[] {
    const lowerText = jobPostingText.toLowerCase();
    const requirements: JobSkillRequirement[] = [];

    for (const item of skillDictionary) {
        const matchedAlias = item.aliases.find((alias) => lowerText.includes(alias.toLowerCase()));

        if (!matchedAlias) {
            continue;
        }

        requirements.push({
            skill: item.skill,
            importance: detectImportance(jobPostingText, matchedAlias),
            sourceText: matchedAlias,
        });
    }

    return requirements;
}
