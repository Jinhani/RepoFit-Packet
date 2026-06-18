export type RequirementImportance = "required" | "preferred" | "mentioned";

export type JobSkillRequirement = {
    skill: string;
    importance: RequirementImportance;
    sourceText: string;
};
