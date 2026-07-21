import type { ApplicationPacket } from "../../types/packet";

type ApplicationPacketResultProps = {
    packet: ApplicationPacket;
};

export function ApplicationPacketResult(props: ApplicationPacketResultProps) {
    return (
        <section>
            <h2>생성된 패킷</h2>
            <p>회사명: {props.packet.companyName}</p>
            <p>상태: {props.packet.status}</p>
        </section>
    );
}
