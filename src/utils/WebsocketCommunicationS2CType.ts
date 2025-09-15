import type {WebsocketEventC2SEnum} from "./WebsocketCommunicationC2SType.ts";

export enum WebsocketEventS2CEnum {
    COMMUNICATION = "COMMUNICATION",
    MONSTER_KILL = "MONSTER_KILL",
    BROADCAST = "BROADCAST"

}

export type WebsocketCommunicationS2CType = {
    event: WebsocketEventS2CEnum,
    data?: Record<string, string | Record<string, string> | string[]> | MonsterKillPayload | BroadcastPayload
}
type MonsterKillPayload = { mobType: IMobType }
type BroadcastPayload = {
    event: WebsocketEventC2SEnum,
    data: { monsterName: string, userPseudo: string },
    timestamp: string
}

export interface IMobType {
	name: string;
	cost: string;
	life: string;
	damage: number;
}