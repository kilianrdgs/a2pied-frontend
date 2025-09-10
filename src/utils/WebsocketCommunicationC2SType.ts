export enum WebsocketEventC2SEnum {
    MONSTER_BOUGHT = "MONSTER_BOUGHT",
    MONSTER_KILL = "MONSTER_KILL",
    HELLO = "HELLO"
}


export type WebsocketCommunicationC2SType = {
    event: WebsocketEventC2SEnum,
    data: Record<string, string>
}
