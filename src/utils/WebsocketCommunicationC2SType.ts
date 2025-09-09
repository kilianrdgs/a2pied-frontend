export enum WebsocketEventC2SEnum {
    MONSTER_BOUGHT = "MONSTER_BOUGHT",
    MONSTER_LIST = "MONSTER_LIST",
    MONSTER_KILL = "MONSTER_KILL",
    SYN = "SYN"
}


export type WebsocketCommunicationC2SType = {
    event: WebsocketEventC2SEnum,
    data: Record<string, string>
}
