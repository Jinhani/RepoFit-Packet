import { useEffect, useState } from "react";
import type { GitHubRepoSummary } from "./types/repo";
import { fetchGitHubRepoSummary } from "./features/repos/fetchGitHubRepoSummary";

function App() {
    const [repo, setRepo] = useState<GitHubRepoSummary | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadRepo() {
            const result = await fetchGitHubRepoSummary("facebook", "react");

            if (result === null) {
                setErrorMessage("저장소 정보를 가져오지 못했습니다.");
                return;
            }

            setRepo(result);
        }

        loadRepo();
    }, []);

    return (
        <div>
            <h1>RepoFit Packet</h1>

            {errorMessage && <p>{errorMessage}</p>}

            {repo && (
                <div>
                    <h2>{repo.fullName}</h2>
                    <p>{repo.description}</p>
                    <p>Language: {repo.language}</p>
                    <a href={repo.htmlUrl}>GitHub에서 보기</a>
                </div>
            )}
        </div>
    );
}

export default App;
