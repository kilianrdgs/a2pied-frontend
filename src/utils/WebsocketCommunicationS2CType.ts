export enum WebsocketEventS2CEnum {
	COMMUNICATION = "COMMUNICATION",
	MONSTER_KILL = "MONSTER_KILL",
	MONSTER_SPAWN = "MONSTER_SPAWN",
}

export type WebsocketCommunicationS2CType = {
	event: WebsocketEventS2CEnum;
	data?:
		| Record<string, string | Record<string, string> | string[]>
		| MonsterKillPayload;
};
type MonsterKillPayload = { mobType: IMobType };

export interface IMobType {
	name: string;
	cost: string;
	life: string;
	damage: number;
}
