import type { ApplicationPacket } from "../../types/packet";

type ApplicationPacketResultProps = {
    packet: ApplicationPacket;
};

export function ApplicationPacketResult(props: ApplicationPacketResultProps) {
    return (
        <section>
            <h2>생성된 패킷</h2>
            <p>회사명: {props.packet.companyName}</p>
            <p>직무명: {props.packet.jobTitle}</p>
            <p>상태: {props.packet.status}</p>
            <p>공고 내용: {props.packet.jobPostingText}</p>
            <h3>보완 작업</h3>

            {props.packet.remediationTasks.length === 0 ? (
                <p>보완 작업이 없습니다.</p>
            ) : (
                <ul>
                    {props.packet.remediationTasks.map((task) => (
                        <li key={task.id}>
                            {task.title} - {task.status}
                            <p>{task.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
