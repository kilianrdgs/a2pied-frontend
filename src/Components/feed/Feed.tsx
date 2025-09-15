import {useEffect, useState} from "react"
import {useAppWebSocket} from "../../utils/useAppWebSocket.ts";
import {WebsocketEventS2CEnum} from "../../utils/WebsocketCommunicationS2CType.ts";
import {WebsocketEventC2SEnum} from "../../utils/WebsocketCommunicationC2SType.ts";
import {LiveIndicator} from "./LiveIndicator.tsx";
import {ShowPurchaseButton} from "./ShowPurchaseButton.tsx";
import {ShowDeathsButton} from "./ShowDeathButton.tsx";
import "./feed.css";
import {Event} from "./Event.tsx";


export interface NewEvent {
    id: string
    type: WebsocketEventC2SEnum
    userPseudo: string
    monsterName: string
    timestamp: Date
}

export default function Feed() {
    const [events, setEvents] = useState<NewEvent[]>([])
    const [showDeaths, setShowDeaths] = useState(true)
    const [showPurchases, setShowPurchases] = useState(true)
    const {lastJsonMessage} = useAppWebSocket()
    useEffect(() => {
        if (lastJsonMessage && lastJsonMessage.data) {
            const {data} = lastJsonMessage
            console.log(lastJsonMessage)
            if (lastJsonMessage?.event === WebsocketEventS2CEnum.BROADCAST) {
                if ('event' in data) {
                    if ('data' in data) {
                        const {data: deepData} = data;
                        if (typeof deepData === "object" && 'userPseudo' in deepData && 'monsterName' in deepData) {
                            const newEvent: NewEvent = {
                                id: Date.now().toString() + Math.random(),
                                type: data?.event as WebsocketEventC2SEnum,
                                userPseudo: deepData?.userPseudo as string,
                                monsterName: deepData?.monsterName as string,
                                timestamp: new Date(parseInt(data?.timestamp as string))
                            }
                            setEvents([...events, newEvent])
                        } else if (typeof deepData === "object" && 'action' in deepData) {
                            if (deepData.action === "reset") {
                                setEvents([])
                            }
                        }
                    }

                }
            }
        }
    }, [lastJsonMessage])

    const toggleShowPurchases = () => {
        setShowPurchases(!showPurchases)
    }
    const toggleShowDeaths = () => {
        setShowDeaths(!showDeaths)
    }
    const filteredEvents = events.filter((event) => {
        if (!showDeaths && event.type === WebsocketEventC2SEnum.MONSTER_KILL) return false
        if (!showPurchases && event.type === WebsocketEventC2SEnum.MONSTER_BOUGHT) return false
        return true
    })

    return (
        <div
            className="bg-black border-2 border-red-500 rounded-lg p-4  w-[100%]  min-w-lg h-96 flex flex-col justify-between">
            <div className="flex flex-col gap-4 mb-6">
                <h3 className="text-red-500 text-lg font-bold tracking-wider">&gt; FEED ACTUALITÉS</h3>

                <div className="flex flex-wrap gap-2 text-sm">
                    <ShowDeathsButton toggleShowDeaths={toggleShowDeaths} showDeaths={showDeaths}/>
                    <ShowPurchaseButton toggleShowPurchases={toggleShowPurchases} showPurchases={showPurchases}/>
                </div>
            </div>

            <div
                className="space-y-2 p-1 overflow-y-scroll scrollbar">
                {filteredEvents.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">&gt; Aucun événement à afficher</div>
                ) : (
                    filteredEvents.reverse().map((event,) => (
                        <Event event={event} key={event.id}/>
                    ))
                )}
            </div>

            <LiveIndicator/>
        </div>
    )
}
