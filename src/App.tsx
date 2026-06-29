import { buildRepoEvidence } from "./features/repos/buildRepoEvidence";
import type { GitHubRepoSummary, PackageJsonInfo } from "./types/repo";
import type { JobSkillRequirement } from "./types/job";
import { matchJobRequirementsToRepoEvidence } from "./features/repos/matchJobRequirementsToRepoEvidence";

function App() {
    const repoSummary: GitHubRepoSummary = {
        id: 1,
        owner: "demo",
        name: "repo",
        fullName: "demo/repo",
        description: "React project",
        htmlUrl: "https://github.com/demo/repo",
        homepage: "https://example.com",
        language: "TypeScript",
        updatedAt: "2026-01-01T00:00:00Z",
    };

    const packageInfo: PackageJsonInfo = {
        dependencies: ["react", "zustand"],
        devDependencies: ["typescript", "vitest"],
        scripts: ["dev", "build", "test"],
    };

    const evidence = buildRepoEvidence(repoSummary, "# Demo README", packageInfo);
    const requirements: JobSkillRequirement[] = [
        { skill: "React", importance: "required", sourceText: "React 사용 경험" },
        { skill: "Testing", importance: "preferred", sourceText: "테스트 코드 작성 경험" },
    ] as const;

    const matches = matchJobRequirementsToRepoEvidence(requirements, evidence);

    console.log(matches);

    console.log(evidence);

    return (
        <div>
            <h1>RepoFit Packet</h1>

            <ul>
                {matches.map((match) => (
                    <li key={match.requirement.skill}>
                        {match.requirement.skill} - {match.status}
                        {match.status === "missing" ? "/ 보완 필요" : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
