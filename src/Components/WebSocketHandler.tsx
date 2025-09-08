import {useEffect} from "react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {getWebSocketURL} from "../utils/getWebSocketURL.ts";

export function WebSocketHandler() {
    const {lastJsonMessage, readyState, sendMessage} = useWebSocket(
        getWebSocketURL(),
        {
            share: true,
            shouldReconnect: () => true,
        },
    )
    useEffect(() => {
        console.log("Connection state changed")

        if (readyState === ReadyState.OPEN) {
            sendMessage("ping")
        }
    }, [readyState])

    useEffect(() => {
        console.log(`Got a new message: ${JSON.stringify(lastJsonMessage)}`)
    }, [lastJsonMessage])
    return <></>;
}
