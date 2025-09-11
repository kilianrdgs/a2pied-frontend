import {useEffect, useState} from "react";
import type {UserData} from "../../services/api.ts";
import {createUser} from "../../services/api.ts";
import "./shop-Kilian.css";

import logo from "../../../public/logo.png";
import avatar from "../../../public/logo.png";
import boiteAffamee from "../../../public/logo.png";
import boitePiegee from "../../../public/logo.png";
import boiteVolante from "../../../public/logo.png";
import boiteColossale from "../../../public/logo.png";
import {usePointsStore} from "../../utils/pointsStore.ts";
import {useAppWebSocket} from "../../utils/useAppWebSocket.ts";
import {type WebsocketCommunicationC2SType, WebsocketEventC2SEnum,} from "../../utils/WebsocketCommunicationC2SType.ts";

const shopItems = [
    {
        name: "Gobelin",
        cost: "10",
        life: "20",
        image: boiteAffamee,
        damage: 3,
    },
    {
        name: "Orc",
        cost: "25",
        life: "40",
        image: boitePiegee,
        damage: 7,
    },
    {
        name: "Troll",
        cost: "50",
        life: "80",
        image: boiteVolante,
        damage: 12,
    },
    {
        name: "Dragon",
        cost: "200",
        life: "300",
        image: boiteColossale,
        damage: 30,
    },
];

function ShopKilian() {
    const [username, setUsername] = useState("MAITRE AXEL");
    const [email, setEmail] = useState("test@gmail.com");
    const [_isLoading, setIsLoading] = useState(false);
    const [isUserSaved, setIsUserSaved] = useState(false);
    const {isOpen, sendJsonMessage} = useAppWebSocket({autoSyn: true, email});

    const points = usePointsStore((state) => state.points);

    const handleClick = (name: string) => {
        const msg: WebsocketCommunicationC2SType = {
            event: WebsocketEventC2SEnum.MONSTER_BOUGHT,
            data: {monsterName: name, userEmail: email},
        };
        sendJsonMessage(msg);
    };

    // Load data from localStorage
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");

        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);
    // Save to database when values change
    useEffect(() => {
        if (username !== "MAITRE AXEL" && email !== "test@gmail.com") {
            saveUserToDatabase();
        }
    }, [username, email]);

    const saveUserToDatabase = async () => {
        // Don't save if already saved or using default values
        if (
            isUserSaved ||
            (username === "MAITRE AXEL" && email === "test@gmail.com")
        ) {
            return;
        }

        setIsLoading(true);
        try {
            const userData: UserData = {
                mail: email,
                pseudo: username,
            };

            await createUser(userData);
            setIsUserSaved(true);
        } catch (error) {
            console.error("Error saving user to DB:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="shop-container">
            <header className="shop-header">
                <img src={logo} alt="Foot Factor Logo" className="shop-logo"/>
                <h1>FOOT FACTOR</h1>
            </header>

            <main className="shop-main">
                <div className="user-info-bar">
                    <div className="user-details">
                        <img src={avatar} alt="Maitre Axel" className="user-avatar"/>
                        <div>
                            <p className="user-name">{username.toUpperCase()}</p>
                            <p className="user-email">{email}</p>
                        </div>
                    </div>
                    <div className="user-credits">{points} CRÉDITS</div>
                </div>

                <div className="shop-grid">
                    {shopItems.map((item) => {
                        const cost = Number(item.cost);
                        const canAfford = points >= cost;
                        const isDisabled = !isOpen || !canAfford; // <- condition unique

                        return (
                            <div key={item.name} className="shop-item-card">
                                <img src={item.image} alt={item.name} className="item-image"/>
                                <p className="item-name">{item.name}</p>
                                <p className="item-cost">coût: {cost}</p>

                                <button
                                    disabled={isDisabled}
                                    className={`invoke-button ${canAfford ? "affordable" : ""}`}
                                    onClick={() => handleClick(item.name)}
                                >
                                    invoquer
                                </button>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default ShopKilian;
