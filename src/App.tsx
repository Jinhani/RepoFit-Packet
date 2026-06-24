import { buildRepoEvidence } from "./features/repos/buildRepoEvidence";
import type { GitHubRepoSummary, PackageJsonInfo } from "./types/repo";

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

    console.log(evidence);

    return <div>RepoFit Packet</div>;
}

export default App;
