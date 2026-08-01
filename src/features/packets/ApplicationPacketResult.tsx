import type { ApplicationPacket } from "../../types/packet";

type ApplicationPacketResultProps = {
    packet: ApplicationPacket;
    onToggleTask: (taskId: string) => void;
    onStatusChange: (status: ApplicationPacket["status"]) => void;
};

export function ApplicationPacketResult(props: ApplicationPacketResultProps) {
    return (
        <section className="packet-result">
            <h2>생성된 패킷</h2>

            <p>회사명: {props.packet.companyName}</p>
            <p>직무명: {props.packet.jobTitle}</p>
            <label htmlFor="packet-status">상태</label>
            <select
                id="packet-status"
                value={props.packet.status}
                onChange={(event) => props.onStatusChange(event.target.value as ApplicationPacket["status"])}
            >
                <option value="draft">초안</option>
                <option value="reviewing">검토 중</option>
                <option value="ready">지원 준비 완료</option>
                <option value="sent">지원 완료</option>
            </select>
            <p>공고 내용: {props.packet.jobPostingText}</p>

            {props.packet.notes !== "" && <p>지원 메모: {props.packet.notes}</p>}

            <h3>GitHub 저장소</h3>

            <ul>
                {props.packet.repoUrls.map((repoUrl) => (
                    <li key={repoUrl}>
                        <a href={repoUrl} target="_blank" rel="noreferrer">
                            {repoUrl}
                        </a>
                    </li>
                ))}
            </ul>

            <h3>보완 작업</h3>

            {props.packet.remediationTasks.length === 0 ? (
                <p>보완 작업이 없습니다.</p>
            ) : (
                <ul>
                    {props.packet.remediationTasks.map((task) => (
                        <li key={task.id}>
                            {task.title} - {task.status}
                            <p>{task.description}</p>
                            <button type="button" onClick={() => props.onToggleTask(task.id)}>
                                {task.status === "todo" ? "완료" : "되돌리기"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
