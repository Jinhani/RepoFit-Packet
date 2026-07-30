import type { ApplicationPacket } from "../../types/packet";
import { buildApplicationPacketMarkdown } from "./buildApplicationPacketMarkdown";

function sanitizeFileNamePart(value: string): string {
    return value.replace(/[\\/:*?"<>|]/g, "-");
}

export function downloadApplicationPacketMarkdown(packet: ApplicationPacket) {
    const markdown = buildApplicationPacketMarkdown(packet);
    const file = new Blob([markdown], {
        type: "text/markdown;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(file);
    const safeCompanyName = sanitizeFileNamePart(packet.companyName);
    const safeJobTitle = sanitizeFileNamePart(packet.jobTitle);
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.download = `${safeCompanyName}-${safeJobTitle}-packet.md`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(downloadUrl);
}
