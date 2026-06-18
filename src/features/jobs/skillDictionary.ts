export type SkillDictionaryItem = {
    skill: string;
    aliases: string[];
};

export const skillDictionary: SkillDictionaryItem[] = [
    {
        skill: "React",
        aliases: ["react", "리액트", "react.js"],
    },
    {
        skill: "TypeScript",
        aliases: ["typescript", "타입스크립트", "ts"],
    },
    {
        skill: "JavaScript",
        aliases: ["javascript", "자바스크립트", "js"],
    },
    {
        skill: "REST API",
        aliases: ["rest api", "api 연동", "api"],
    },
    {
        skill: "Supabase",
        aliases: ["supabase", "슈파베이스", "수파베이스"],
    },
    {
        skill: "Git",
        aliases: ["git", "github", "깃", "깃허브"],
    },
    {
        skill: "Testing",
        aliases: ["test", "testing", "vitest", "jest", "테스트"],
    },
];
