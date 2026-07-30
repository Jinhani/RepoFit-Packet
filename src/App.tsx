import { useState, type FormEvent } from "react";
import { ApplicationPacketResult } from "./features/packets/ApplicationPacketResult";
import { buildRepoEvidence } from "./features/repos/buildRepoEvidence";
import type { PackageJsonInfo, SkillMatch } from "./types/repo";
import { matchJobRequirementsToRepoEvidence } from "./features/repos/matchJobRequirementsToRepoEvidence";
import { buildRemediationTasksFromMatches } from "./features/repos/buildRemediationTasksFromMatches";
import { buildApplicationPacket } from "./features/packets/buildApplicationPacket";
import { extractJobSkillRequirements } from "./features/jobs/extractJobSkillRequirements";
import type { ApplicationPacket } from "./types/packet";
import { parseGitHubRepoUrl } from "./features/repos/parseGitHubRepoUrl";
import { fetchGitHubRepoSummary } from "./features/repos/fetchGitHubRepoSummary";
import { fetchGitHubReadmeText } from "./features/repos/fetchGitHubReadmeText";
import { fetchGitHubPackageJson } from "./features/repos/fetchGitHubPackageJson";

const STORAGE_KEY = "repofit-application-packet";

const EMPTY_PACKAGE_INFO: PackageJsonInfo = {
    dependencies: [],
    devDependencies: [],
    scripts: [],
};

function loadSavedApplicationPacket(): ApplicationPacket | null {
    try {
        const savedPacket = localStorage.getItem(STORAGE_KEY);

        if (savedPacket === null) {
            return null;
        }

        return JSON.parse(savedPacket) as ApplicationPacket;
    } catch {
        return null;
    }
}

function saveApplicationPacket(packet: ApplicationPacket): boolean {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(packet));

        return true;
    } catch {
        return false;
    }
}

function App() {
    const [applicationPacket, setApplicationPacket] = useState<ApplicationPacket | null>(loadSavedApplicationPacket);

    const [jobPostingText, setJobPostingText] = useState(
        applicationPacket?.jobPostingText ?? "React와 테스트 코드 작성 경험 필수",
    );
    const [companyName, setCompanyName] = useState(applicationPacket?.companyName ?? "데모 회사");
    const [jobTitle, setJobTitle] = useState(applicationPacket?.jobTitle ?? "프론트엔드 개발자");
    const [repoUrl, setRepoUrl] = useState(applicationPacket?.repoUrls[0] ?? "");
    const [notes, setNotes] = useState(applicationPacket?.notes ?? "");

    const [matches, setMatches] = useState<SkillMatch[]>([]);
    const [validationMessage, setValidationMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleBuildPacket(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        const trimmedCompanyName = companyName.trim();
        const trimmedJobTitle = jobTitle.trim();
        const trimmedJobPostingText = jobPostingText.trim();
        const trimmedRepoUrl = repoUrl.trim();
        const trimmedNotes = notes.trim();

        if (
            trimmedCompanyName === "" ||
            trimmedJobTitle === "" ||
            trimmedJobPostingText === "" ||
            trimmedRepoUrl === ""
        ) {
            setValidationMessage("회사명, 직무명, 채용공고, 저장소 URL을 모두 입력해주세요.");
            return;
        }

        const parsedRepo = parseGitHubRepoUrl(trimmedRepoUrl);

        if (parsedRepo === null) {
            setValidationMessage("올바른 GitHub 저장소 URL을 입력해주세요.");
            return;
        }

        setIsLoading(true);
        setValidationMessage("");

        try {
            const fetchedRepoSummary = await fetchGitHubRepoSummary(parsedRepo.owner, parsedRepo.repo);

            if (fetchedRepoSummary === null) {
                setValidationMessage("GitHub 저장소 정보를 불러오지 못했습니다.");
                return;
            }

            const [readmeText, fetchedPackageInfo] = await Promise.all([
                fetchGitHubReadmeText(parsedRepo.owner, parsedRepo.repo),
                fetchGitHubPackageJson(parsedRepo.owner, parsedRepo.repo),
            ]);

            const evidence = buildRepoEvidence(
                fetchedRepoSummary,
                readmeText ?? "",
                fetchedPackageInfo ?? EMPTY_PACKAGE_INFO,
            );

            const requirements = extractJobSkillRequirements(trimmedJobPostingText);

            const nextMatches = matchJobRequirementsToRepoEvidence(requirements, evidence);

            const remediationTasks = buildRemediationTasksFromMatches(nextMatches);

            const normalizedRepoUrl = `https://github.com/${parsedRepo.fullName}`;

            const packet = buildApplicationPacket(
                trimmedCompanyName,
                trimmedJobTitle,
                trimmedJobPostingText,
                [normalizedRepoUrl],
                trimmedNotes,
                remediationTasks,
            );

            setMatches(nextMatches);
            setApplicationPacket(packet);

            const isSaved = saveApplicationPacket(packet);

            if (!isSaved) {
                setValidationMessage("패킷은 생성됐지만 브라우저 저장에 실패했습니다.");
            }

            console.log("실제 저장소 정보:", fetchedRepoSummary);
            console.log("실제 README:", readmeText);
            console.log("실제 package.json 정보:", fetchedPackageInfo);
            console.log("생성된 패킷:", packet);
        } catch {
            setValidationMessage("저장소를 분석하는 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    function handleClearPacket() {
        setApplicationPacket(null);
        setMatches([]);
        setValidationMessage("");

        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            setValidationMessage("화면에서는 삭제됐지만 브라우저 저장 데이터 삭제에 실패했습니다.");
        }
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

        const isSaved = saveApplicationPacket(updatedPacket);

        if (!isSaved) {
            setValidationMessage("완료 상태는 변경됐지만 브라우저 저장에 실패했습니다.");
        }
    }

    return (
        <div>
            <h1>RepoFit Packet</h1>

            <form onSubmit={handleBuildPacket} aria-busy={isLoading}>
                <label htmlFor="job-title">직무명</label>
                <input id="job-title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} />

                <label htmlFor="job-posting">채용공고</label>
                <textarea
                    id="job-posting"
                    rows={8}
                    value={jobPostingText}
                    onChange={(event) => setJobPostingText(event.target.value)}
                />

                <label htmlFor="repo-url">GitHub 저장소 URL</label>
                <input
                    id="repo-url"
                    type="url"
                    placeholder="https://github.com/owner/repository"
                    value={repoUrl}
                    onChange={(event) => setRepoUrl(event.target.value)}
                />

                <label htmlFor="company-name">회사명</label>
                <input id="company-name" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />

                <label htmlFor="packet-notes">지원 메모</label>
                <textarea id="packet-notes" rows={4} value={notes} onChange={(event) => setNotes(event.target.value)} />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "저장소 분석 중..." : "패킷 생성"}
                </button>

                <button type="button" disabled={isLoading} onClick={handleClearPacket}>
                    패킷 삭제
                </button>
            </form>

            {validationMessage && <p role="status">{validationMessage}</p>}

            {applicationPacket && (
                <ApplicationPacketResult packet={applicationPacket} onCompleteTask={handleCompleteTask} />
            )}

            {matches.length > 0 && (
                <ul>
                    {matches.map((match) => (
                        <li key={match.requirement.skill}>
                            {match.requirement.skill} - {match.status}
                            {match.status === "missing" ? " / 보완 필요" : ""}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;
