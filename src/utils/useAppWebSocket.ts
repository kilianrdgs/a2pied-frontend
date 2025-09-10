// useAppWebSocket.ts
import {useEffect, useMemo} from 'react';
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {getWebSocketURL} from "./getWebSocketURL.ts";
import {type WebsocketCommunicationC2SType, WebsocketEventC2SEnum} from "./WebsocketCommunicationC2SType.ts";
import type {WebsocketCommunicationS2CType} from "./WebsocketCommunicationS2CType.ts";

type UseAppWebSocketOptions = {
    autoSyn?: boolean;
    email: string
};


export function useAppWebSocket(options: UseAppWebSocketOptions) {
    const url: string = getWebSocketURL();

    const {
        lastJsonMessage,
        readyState,
        sendJsonMessage,
        sendMessage
    } = useWebSocket<WebsocketCommunicationS2CType>(`${url}?token=${options.email}`, {
        share: true,
        shouldReconnect: () => true,
    });

    useEffect(() => {
        if (readyState === ReadyState.OPEN && options?.autoSyn !== false) {
            const syn: WebsocketCommunicationC2SType = {
                event: WebsocketEventC2SEnum.HELLO,
                data: {status: 'ok',},
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