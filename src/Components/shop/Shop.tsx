import {useEffect, useState} from "react";
import "./shop.css";

import avatar from "/logo.png";

import {usePointsStore} from "../../utils/pointsStore.ts";
import {useAppWebSocket} from "../../utils/useAppWebSocket.ts";
import {type WebsocketCommunicationC2SType, WebsocketEventC2SEnum,} from "../../utils/WebsocketCommunicationC2SType.ts";
import {
    type IMobType,
    type WebsocketCommunicationS2CPayload,
    WebsocketEventS2CEnum,
} from "../../utils/WebsocketCommunicationS2CType.ts";
import {useToast} from "../ToastManager.tsx";
import MobsGrid from "./mobsgrid/MobsGrid.tsx";
import UpgradesGrid from "./upgradesGrid/UpgradeGrid.tsx";
import {useLoginFromLocalStorage} from "../../utils/useLoginFromLocalStorage.tsx";


// Un seul type pour les mobs
export interface MobType {
    _id: string;
    cost: string;
    name: string;
    life: string;
    damage: number;
    description: string;
}

export default function Shop() {
    const {username, email} = useLoginFromLocalStorage()
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState<"success" | "error">("success");
    const [animateCredits, setAnimateCredits] = useState<boolean>(false);
    const [mobs, setMobs] = useState<MobType[]>([]);

    const {sendJsonMessage, lastJsonMessage} = useAppWebSocket({email});
    const {addToast} = useToast()

    const {
        points,
        removePoints,
        setPoints,
        loadCreditsFromBackend,
    } = usePointsStore();
    // Fonction pour récupérer l'image basée sur le nom

    // Fonction pour afficher une popup
    const showPopupMessage = (message: string, type: "success" | "error"): void => {
        setPopupMessage(message);
        setPopupType(type);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    // Animation des crédits
    const animateCreditsDecrease = (): void => {
        setAnimateCredits(true);
        setTimeout(() => setAnimateCredits(false), 600);
    };

    const handleClick = (mobName: string, mobCost: string): void => {
        const cost = parseInt(mobCost);

        // Vérifier si assez de crédits
        if (points < cost) {
            showPopupMessage(
                `Pas assez de crédits ! Il vous faut ${cost} crédits pour invoquer ${mobName}.`,
                "error",
            );
            return;
        }

        // Déduire les crédits via le store (qui gère automatiquement la sauvegarde)
        removePoints(cost);

        // Animation et popup de succès
        animateCreditsDecrease();
        showPopupMessage(
            `${mobName} invoqué avec succès ! -${cost} crédits`,
            "success",
        );

        // Envoyer le message websocket
        const msg: WebsocketCommunicationC2SType = {
            event: WebsocketEventC2SEnum.MONSTER_BOUGHT,
            data: {monsterName: mobName, userEmail: email},
        };
        sendJsonMessage(msg);
    };

    useEffect(() => {
        if (!lastJsonMessage || !lastJsonMessage.data) return;

        const {event, data} = lastJsonMessage;

        const handleMonsterKill = (data: WebsocketCommunicationS2CPayload) => {
            if ('mobType' in data) {
                const mobType = data.mobType as IMobType;
                addToast({preview: `Ton ${mobType.name} est mort !`});
            }
        };

        const handleBroadcast = (data: WebsocketCommunicationS2CPayload) => {
            if ('event' in data && data.event === "UPDATE_STATE" && 'data' in data && typeof data.data === "object") {
                const deepData = data.data;
                if ('action' in deepData && deepData.action === "reset") {
                    loadCreditsFromBackend();
                }
            }
        };

        switch (event) {
            case WebsocketEventS2CEnum.MONSTER_KILL:
                handleMonsterKill(data);
                break;
            case WebsocketEventS2CEnum.BROADCAST:
                handleBroadcast(data);
                break;
            default:
                break;
        }
    }, [lastJsonMessage, addToast]);

    // Récupérer les mobs depuis l'API
    useEffect(() => {
        const fetchMobs = async (): Promise<void> => {
            try {
                const URL = import.meta.env.VITE_API_BASE_URL;
                const response = await fetch(`${URL}/api/mobtypes`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: MobType[] = await response.json();
                setMobs(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des mobs:", error);
            }
        };

        fetchMobs();
    }, []);

    // Initialisation au démarrage du composant
    useEffect(() => {
        // Load credits from backend
        loadCreditsFromBackend();

    }, [setPoints]);


    return (
        <div className="shop-container">
            {/* Popup */}
            {showPopup && (
                <div className={`popup ${popupType}`}>
                    <div className="popup-content">
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}

            <main className="shop-main">
                <div className="user-info-bar">
                    <div className="user-details">
                        <img src={avatar} alt="Maitre Axel" className="user-avatar"/>
                        <div>
                            <p className="user-name">{username.toUpperCase()}</p>
                            <p className="user-email">{email}</p>
                        </div>
                    </div>
                    <div
                        className={`user-credits ${animateCredits ? "credits-animate" : ""}`}
                    >
                        {points} CRÉDITS
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h3 style={{margin: 5, alignSelf: "start"}}>Invocations</h3>
                    <div style={{display: "flex", flexDirection: "column", gap: 5}}>
                        <MobsGrid
                            mobs={mobs}
                            onMobClick={handleClick}
                        />
                        <UpgradesGrid/>
                    </div>
                </div>
            </main>
        </div>
    );
}
