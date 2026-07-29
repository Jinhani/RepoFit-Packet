import { useState } from "react";
import { ApplicationPacketResult } from "./features/packets/ApplicationPacketResult";
import { buildRepoEvidence } from "./features/repos/buildRepoEvidence";
import type { GitHubRepoSummary, PackageJsonInfo } from "./types/repo";
import { matchJobRequirementsToRepoEvidence } from "./features/repos/matchJobRequirementsToRepoEvidence";
import { buildRemediationTasksFromMatches } from "./features/repos/buildRemediationTasksFromMatches";
import { buildApplicationPacket } from "./features/packets/buildApplicationPacket";
import { extractJobSkillRequirements } from "./features/jobs/extractJobSkillRequirements";
import type { ApplicationPacket } from "./types/packet";
import { parseGitHubRepoUrl } from "./features/repos/parseGitHubRepoUrl";
import { fetchGitHubRepoSummary } from "./features/repos/fetchGitHubRepoSummary";

function App() {
    const [jobPostingText, setJobPostingText] = useState("React와 테스트 코드 작성 경험 필수");
    const [companyName, setCompanyName] = useState("데모 회사");
    const [jobTitle, setJobTitle] = useState("프론트엔드 개발자");
    const [repoUrl, setRepoUrl] = useState("https://github.com/demo/repo");
    const [notes, setNotes] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    const [applicationPacket, setApplicationPacket] = useState<ApplicationPacket | null>(() => {
        const savedPacket = localStorage.getItem("repofit-application-packet");

        if (savedPacket === null) {
            return null;
        }

        return JSON.parse(savedPacket) as ApplicationPacket;
    });

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

    async function handleBuildPacket() {
        if (
            companyName.trim() === "" ||
            jobTitle.trim() === "" ||
            jobPostingText.trim() === "" ||
            repoUrl.trim() === ""
        ) {
            setValidationMessage("회사명, 직무명, 채용공고, 저장소 URL을 모두 입력해주세요.");
            setApplicationPacket(null);
            return;
        }

        const parsedRepo = parseGitHubRepoUrl(repoUrl);

        if (parsedRepo === null) {
            setValidationMessage("올바른 GitHub 저장소 URL을 입력해주세요.");
            setApplicationPacket(null);
            return;
        }

        const fetchedRepoSummary = await fetchGitHubRepoSummary(parsedRepo.owner, parsedRepo.repo);

        if (fetchedRepoSummary === null) {
            setValidationMessage("GitHub 저장소 정보를 불러오지 못했습니다.");
            setApplicationPacket(null);
            return;
        }

        const normalizedRepoUrl = `https://github.com/${parsedRepo.fullName}`;

        console.log("분석된 GitHub 주소:", parsedRepo);
        console.log("정리된 GitHub 주소:", normalizedRepoUrl);

        setValidationMessage("");

        const packet = buildApplicationPacket(
            companyName,
            jobTitle,
            jobPostingText,
            [normalizedRepoUrl],
            notes,
            remediationTasks,
        );

        console.log("생성된 패킷:", packet);

        setApplicationPacket(packet);
        localStorage.setItem("repofit-application-packet", JSON.stringify(packet));
    }

    function handleClearPacket() {
        setApplicationPacket(null);
        setValidationMessage("");
        localStorage.removeItem("repofit-application-packet");
    }

    function handleCompleteTask(taskId: string) {
        if (applicationPacket === null) {
            return;
        }

        const updatedTasks = applicationPacket.remediationTasks.map((task) =>
            task.id === taskId
                ? {
                      ...task,
                      status: "done" as const,
                  }
                : task,
        );

        const updatedPacket: ApplicationPacket = {
            ...applicationPacket,
            remediationTasks: updatedTasks,
            updatedAt: new Date().toISOString(),
        };

        setApplicationPacket(updatedPacket);
        localStorage.setItem("repofit-application-packet", JSON.stringify(updatedPacket));
    }

    return (
        <div>
            <h1>RepoFit Packet</h1>

            <label htmlFor="job-title">직무명</label>
            <input id="job-title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />

            <label htmlFor="job-posting">채용공고</label>
            <textarea
                id="job-posting"
                value={jobPostingText}
                onChange={(event) => setJobPostingText(event.target.value)}
            />

            <label htmlFor="repo-url">GitHub 저장소 URL</label>
            <input id="repo-url" value={repoUrl} onChange={(event) => setRepoUrl(event.target.value)} />

            <label htmlFor="company-name">회사명</label>
            <input id="company-name" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />

            <label htmlFor="packet-notes">지원 메모</label>
            <textarea id="packet-notes" value={notes} onChange={(event) => setNotes(event.target.value)} />

            <button type="button" onClick={handleBuildPacket}>
                패킷 생성
            </button>

            <button type="button" onClick={handleClearPacket}>
                패킷 삭제
            </button>

            {validationMessage && <p>{validationMessage}</p>}

            {applicationPacket && (
                <ApplicationPacketResult packet={applicationPacket} onCompleteTask={handleCompleteTask} />
            )}

            <ul>
                {matches.map((match) => (
                    <li key={match.requirement.skill}>
                        {match.requirement.skill} - {match.status}
                        {match.status === "missing" ? " / 보완 필요" : ""}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
