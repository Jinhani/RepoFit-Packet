import type { GitHubRepoSummary } from "../../types/repo";

type GitHubRepoApiResponse = {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    updated_at: string;
    owner: {
        login: string;
    };
};

export async function fetchGitHubRepoSummary(owner: string, repo: string): Promise<GitHubRepoSummary | null> {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

        if (!response.ok) {
            return null;
        }

        const data: GitHubRepoApiResponse = await response.json();

        return {
            id: data.id,
            owner: data.owner.login,
            name: data.name,
            fullName: data.full_name,
            description: data.description,
            htmlUrl: data.html_url,
            homepage: data.homepage,
            language: data.language,
            updatedAt: data.updated_at,
        };
    } catch {
        return null;
    }
}
