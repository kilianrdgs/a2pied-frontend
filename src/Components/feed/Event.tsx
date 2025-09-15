import type {NewEvent} from "./Feed.tsx";
import {WebsocketEventC2SEnum} from "../../utils/WebsocketCommunicationC2SType.ts";
import {useEffect, useState} from "react";

type Props = { event: NewEvent };


export function Event({event}: Props) {

    const [isShining, setIsShining] = useState<boolean>(false)
    useEffect(() => {
        setIsShining(true);
        const shineDuration = 700;
        const timeout = setTimeout(() => {
            setIsShining(false);
        }, shineDuration);

        return () => {
            clearTimeout(timeout);
        };
    }, []);
    useEffect(() => {
    }, [])
    const [timeAgo, setTimeAgo] = useState("00s");

    useEffect(() => {
        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - event.timestamp.getTime()) / 1000);

            const hours = Math.floor(elapsed / 3600);
            const minutes = Math.floor((elapsed % 3600) / 60);
            const seconds = elapsed % 60;

            let display = "";

            if (hours > 0) {
                display = `${String(hours)}h${minutes.toString().padStart(2, "0")}m${seconds.toString().padStart(2, "0")}s`;
            } else if (minutes > 0) {
                display = `${minutes}m${seconds.toString().padStart(2, "0")}s`;
            } else {
                display = `${seconds.toString().padStart(2, "0")}s`;
            }

            setTimeAgo(display);
        }, 1000);

        return () => clearInterval(interval);
    }, [event]);

    return <div

        className={`border-l-2 pl-3 py-2 transition-all duration-300 w-max min-w-[100%] border-gray-600   ${isShining
            ? "bg-amber-800"
            : "bg-gray-900/50"
        }`}
    >
        <div className="flex justify-between">
            <div className="flex items-start">
                {event.type === WebsocketEventC2SEnum.MONSTER_BOUGHT ? (
                    <span className="text-green-400">
                      &gt;{" "}
                        <span
                            className={"text-white"}>
                        {event.userPseudo}
                      </span>{" "}
                        a acheté <span className="text-blue-400">{event.monsterName}</span>
                    </span>
                ) : (
                    <span className="text-red-400">
                      &gt; <span className="text-blue-400">{event.monsterName}</span> de{" "}
                        <span
                            className={"text-white"}>
                        {event.userPseudo}
                      </span>{" "}
                        s'est fait tuer
                    </span>
                )}
            </div>
            <span
                className="pl-2 text-gray-500 text-xs whitespace-nowrap">{timeAgo}</span>
        </div>
    </div>;
}
