type GitHubReadmeApiResponse = {
    content: string;
    encoding: string;
};

function decodeBase64Content(content: string): string {
    const cleanedContent = content.replace(/\n/g, "");
    const decodedText = atob(cleanedContent);

    return decodeURIComponent(
        decodedText
            .split("")
            .map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
            .join(""),
    );
}

export async function fetchGitHubReadmeText(owner: string, repo: string): Promise<string | null> {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);

        if (!response.ok) {
            return null;
        }

        const data: GitHubReadmeApiResponse = await response.json();

        if (data.encoding !== "base64") {
            return null;
        }

        return decodeBase64Content(data.content);
    } catch {
        return null;
    }
}
