// useAppWebSocket.ts
import {useEffect, useMemo} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {getWebSocketURL} from "./getWebSocketURL.ts";
import {type WebsocketCommunicationC2SType, WebsocketEventC2SEnum} from "./WebsocketCommunicationC2SType.ts";

type UseAppWebSocketOptions = {
    autoSyn?: boolean;
};

export function useAppWebSocket(options?: UseAppWebSocketOptions) {
    const url: string = getWebSocketURL();

    const {lastJsonMessage, readyState, sendJsonMessage, sendMessage} = useWebSocket(url, {
        share: true,
        shouldReconnect: () => true,
    });

    useEffect(() => {
        if (readyState === ReadyState.OPEN && options?.autoSyn !== false) {
            const syn: WebsocketCommunicationC2SType = {
                event: WebsocketEventC2SEnum.SYN,
                data: {status: 'ok'},
            };
            sendJsonMessage(syn);
        }
    }, [readyState, sendJsonMessage, options?.autoSyn]);
    useEffect(() => {
        console.log(`Got a new json message: ${JSON.stringify(lastJsonMessage)}`)
    }, [lastJsonMessage])

    return useMemo(() => {
        return {
            url,
            readyState,
            lastJsonMessage,
            sendJsonMessage,
            send: sendMessage,
            isOpen: readyState === ReadyState.OPEN,
        };
    }, [url, readyState, lastJsonMessage, sendJsonMessage, sendMessage]);
}