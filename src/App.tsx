import { useEffect } from "react";
import { fetchGitHubRepoSummary } from "./features/repos/fetchGitHubRepoSummary";

function App() {
    useEffect(() => {
        async function loadRepo() {
            const repo = await fetchGitHubRepoSummary("facebook", "react");
            console.log(repo);
        }

        loadRepo();
    }, []);

    return <div>RepoFit Packet</div>;
}

export default App;
