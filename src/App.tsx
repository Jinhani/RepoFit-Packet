import { useState } from "react";

import { buildRepoEvidence } from "./features/repos/buildRepoEvidence";
import type { GitHubRepoSummary, PackageJsonInfo } from "./types/repo";
import { matchJobRequirementsToRepoEvidence } from "./features/repos/matchJobRequirementsToRepoEvidence";
import { buildRemediationTasksFromMatches } from "./features/repos/buildRemediationTasksFromMatches";
import { buildApplicationPacket } from "./features/packets/buildApplicationPacket";
import { extractJobSkillRequirements } from "./features/jobs/extractJobSkillRequirements";
import type { ApplicationPacket } from "./types/packet";
type ApplicationPacketResultProps = {
    packet: ApplicationPacket;
};

    const [jobPostingText, setJobPostingText] = useState("React와 테스트 코드 작성 경험 필수");
    const [companyName, setCompanyName] = useState("데모 회사");
    const [applicationPacket, setApplicationPacket] = useState<ApplicationPacket | null>(null);
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
    const requirements = extractJobSkillRequirements(jobPostingText);
    const matches = matchJobRequirementsToRepoEvidence(requirements, evidence);
    const remediationTasks = buildRemediationTasksFromMatches(matches);
    function handleBuildPacket() {
        const packet = buildApplicationPacket(companyName, jobPostingText, remediationTasks);

        setApplicationPacket(packet);
    }

    return (
        <div>
            <h1>RepoFit Packet</h1>

            <label htmlFor="job-posting">채용공고</label>
            <textarea
                id="job-posting"
                value={jobPostingText}
                onChange={(event) => setJobPostingText(event.target.value)}
            />
            <label htmlFor="company-name">회사명</label>
            <input id="company-name" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
            <button type="button" onClick={handleBuildPacket}>
                패킷 생성
            </button>
            {applicationPacket && (
                <section>
                    <h2>생성된 패킷</h2>
                    <p>회사명: {applicationPacket.companyName}</p>
                    <p>상태: {applicationPacket.status}</p>
                </section>
            )}
        
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
