export const getWebSocketURL = (): string => {
    const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

    if (!WEBSOCKET_URL) throw new Error()
    return WEBSOCKET_URL
}