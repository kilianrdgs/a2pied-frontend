import { useEffect, useState } from "react";
import { useAppWebSocket } from "../../utils/useAppWebSocket.ts";
import { WebsocketEventC2SEnum } from "../../utils/WebsocketCommunicationC2SType.ts";
import { WebsocketEventS2CEnum } from "../../utils/WebsocketCommunicationS2CType.ts";
import { LiveIndicator } from "./LiveIndicator.tsx";
import { ShowDeathsButton } from "./ShowDeathButton.tsx";
import { ShowPurchaseButton } from "./ShowPurchaseButton.tsx";
import "./feed.css";
import { useNavigate } from "react-router";
import Header from "../header/Header.tsx";
import { Event } from "./Event.tsx";

export interface NewEvent {
	id: string;
	type: WebsocketEventC2SEnum;
	userPseudo: string;
	monsterName: string;
	timestamp: Date;
}

export default function Feed() {
	const [events, setEvents] = useState<NewEvent[]>([]);
	const [showDeaths, setShowDeaths] = useState(true);
	const [showPurchases, setShowPurchases] = useState(true);
	const { lastJsonMessage } = useAppWebSocket();

	const navigate = useNavigate();

	useEffect(() => {
		if (lastJsonMessage && lastJsonMessage.data) {
			const { data } = lastJsonMessage;
			if (lastJsonMessage?.event === WebsocketEventS2CEnum.BROADCAST) {
				if ("event" in data) {
					if ("data" in data) {
						const { data: deepData } = data;
						if (
							typeof deepData === "object" &&
							"userPseudo" in deepData &&
							"monsterName" in deepData
						) {
							const newEvent: NewEvent = {
								id: Date.now().toString() + Math.random(),
								type: data?.event as WebsocketEventC2SEnum,
								userPseudo: deepData?.userPseudo as string,
								monsterName: deepData?.monsterName as string,
								timestamp: new Date(parseInt(data?.timestamp as string)),
							};
							setEvents([...events, newEvent]);
						} else if (typeof deepData === "object" && "action" in deepData) {
							if (deepData.action === "reset") {
								setEvents([]);
							}
						}
					}
				}
			}
		}
	}, [lastJsonMessage]);

	const toggleShowPurchases = () => {
		setShowPurchases(!showPurchases);
	};
	const toggleShowDeaths = () => {
		setShowDeaths(!showDeaths);
	};
	const filteredEvents = events.filter((event) => {
		if (!showDeaths && event.type === WebsocketEventC2SEnum.MONSTER_KILL)
			return false;
		if (!showPurchases && event.type === WebsocketEventC2SEnum.MONSTER_BOUGHT)
			return false;
		return true;
	});

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100vh",
				justifyContent: "space-between",
			}}
		>
			<Header />

			<div
				className="feed-container"
				style={{ display: "flex", flexDirection: "column", flex: 1 }}
			>
				<div style={{ width: "100%", textAlign: "start" }}>
					<h3 style={{ color: "red", marginLeft: 10 }}>FEED ACTUALITÉS</h3>
				</div>

				<div style={{ flex: 1 }}>
					<div style={{ display: "flex", gap: 10, padding: 10 }}>
						<ShowDeathsButton
							toggleShowDeaths={toggleShowDeaths}
							showDeaths={showDeaths}
						/>
						<ShowPurchaseButton
							toggleShowPurchases={toggleShowPurchases}
							showPurchases={showPurchases}
						/>
					</div>

					<div className="space-y-2 p-1 overflow-y-scroll scrollbar">
						{filteredEvents.length === 0 ? (
							<div className="text-gray-500 text-center py-8">
								&gt; Aucun événement à afficher
							</div>
						) : (
							filteredEvents
								.reverse()
								.map((event) => <Event event={event} key={event.id} />)
						)}
					</div>
				</div>

				<LiveIndicator />
			</div>
			<button
				onClick={() => navigate("/panel")}
				style={{
					backgroundColor: "red",
					color: "white",
					border: "none",
					padding: "10px 15px",
					borderRadius: 5,
					cursor: "pointer",
				}}
			>
				Menu Principal
			</button>
		</div>
	);
}
