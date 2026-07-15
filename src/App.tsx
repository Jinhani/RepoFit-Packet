import { buildRepoEvidence } from "./features/repos/buildRepoEvidence";
import type { GitHubRepoSummary, PackageJsonInfo } from "./types/repo";
import { matchJobRequirementsToRepoEvidence } from "./features/repos/matchJobRequirementsToRepoEvidence";
import { buildRemediationTasksFromMatches } from "./features/repos/buildRemediationTasksFromMatches";
import { buildApplicationPacket } from "./features/packets/buildApplicationPacket";
import { extractJobSkillRequirements } from "./features/jobs/extractJobSkillRequirements";

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

    const jobPostingText = "React와 테스트 코드 작성 경험 필수";

    const evidence = buildRepoEvidence(repoSummary, "# Demo README", packageInfo);
    const requirements = extractJobSkillRequirements(jobPostingText);
    const matches = matchJobRequirementsToRepoEvidence(requirements, evidence);
    const remediationTasks = buildRemediationTasksFromMatches(matches);
    const applicationPacket = buildApplicationPacket("데모 회사", jobPostingText, remediationTasks);
    console.log(requirements);
    console.log(matches);
    console.log(evidence);
    console.log(remediationTasks);
    console.log(applicationPacket);
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
