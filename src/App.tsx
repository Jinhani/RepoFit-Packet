import { parseGitHubRepoUrl } from "./features/repos/parseGitHubRepoUrl";

function App() {
    const result = parseGitHubRepoUrl("https://github.com/Jinhani/RepoFit-Packet");

    console.log(result);

    return <div>RepoFit Packet</div>;
}

export default App;
