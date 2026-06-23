import type { PackageJsonInfo } from "../../types/repo";

type GitHubContentApiResponse = {
    content: string;
    encoding: string;
};

type RawPackageJson = {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    scripts?: Record<string, string>;
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

export async function fetchGitHubPackageJson(owner: string, repo: string): Promise<PackageJsonInfo | null> {
    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/package.json`);

        if (!response.ok) {
            return null;
        }

        const data: GitHubContentApiResponse = await response.json();

        if (data.encoding !== "base64") {
            return null;
        }

        const packageJsonText = decodeBase64Content(data.content);
        const packageJson: RawPackageJson = JSON.parse(packageJsonText);

        return {
            dependencies: Object.keys(packageJson.dependencies ?? {}),
            devDependencies: Object.keys(packageJson.devDependencies ?? {}),
            scripts: Object.keys(packageJson.scripts ?? {}),
        };
    } catch {
        return null;
    }
}
