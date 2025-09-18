// useAppWebSocket.ts
import { useEffect, useMemo } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { getWebSocketURL } from "./getWebSocketURL.ts";
import type { WebsocketCommunicationS2CType } from "./WebsocketCommunicationS2CType.ts";

type UseAppWebSocketOptions = {
	email: string;
};

export function useAppWebSocket(options?: UseAppWebSocketOptions) {
	const url: string = getWebSocketURL();
	const userEmail = options?.email ?? localStorage.getItem("email");
	if (!userEmail) {
		console.log(
			"Il y a eu un problème lors de la récuperation de l'email pour se connecter à la websocket",
		);
		throw new Error();
	}
	const { lastJsonMessage, readyState, sendJsonMessage, sendMessage } =
		useWebSocket<WebsocketCommunicationS2CType>(`${url}?token=${userEmail}`, {
			share: true,
			shouldReconnect: () => true,
		});

	useEffect(() => {
		console.log(`Got a new json message: ${JSON.stringify(lastJsonMessage)}`);
	}, [lastJsonMessage]);

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
