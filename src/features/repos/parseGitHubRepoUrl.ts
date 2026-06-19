export type ParsedGitHubRepoUrl = {
    owner: string;
    repo: string;
    fullName: string;
};

export function parseGitHubRepoUrl(url: string): ParsedGitHubRepoUrl | null {
    const trimmedUrl = url.trim();

    try {
        const parsedUrl = new URL(trimmedUrl);

        const hostname = parsedUrl.hostname.toLowerCase();

        if (hostname !== "github.com" && hostname !== "www.github.com") {
            return null;
        }

        const pathParts = parsedUrl.pathname.split("/").filter(Boolean);

        if (pathParts.length < 2) {
            return null;
        }

        const owner = pathParts[0];
        const repo = pathParts[1].replace(/\.git$/, "");

        return {
            owner,
            repo,
            fullName: `${owner}/${repo}`,
        };
    } catch {
        return null;
    }
}
