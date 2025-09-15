import {useAppWebSocket} from "../../utils/useAppWebSocket.ts";


export function LiveIndicator() {
    const {isOpen} = useAppWebSocket()
    const message: string = isOpen ? "LIVE - Mise à jour automatique" : "Pas de connexion"
    return <div className="mt-4 pt-2 border-t border-gray-700  flex-end">
        <div className="flex items-center gap-2 text-xs text-gray-500">
            <div
                className={`w-2 h-2 ${isOpen ? 'bg-green-500' : 'bg-red-500'} min-w-2 min-h-2 rounded-full animate-pulse`}></div>
            {message}
        </div>
    </div>
}
