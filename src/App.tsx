import { useEffect } from "react";
import { fetchGitHubPackageJson } from "./features/repos/fetchGitHubPackageJson";

function App() {
    useEffect(() => {
        async function loadPackageJson() {
            const packageInfo = await fetchGitHubPackageJson("facebook", "react");

            if (packageInfo === null) {
                console.log("package.json을 가져오지 못했습니다.");
                return;
            }

            console.log(packageInfo);
        }

        loadPackageJson();
    }, []);

    return <div>RepoFit Packet</div>;
}

export default App;
