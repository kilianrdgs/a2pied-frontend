import { useEffect, useState } from "react";
import type { UserData } from "../../services/api.ts";
import { createUser } from "../../services/api.ts";
import "./shop.css";

import avatar from "../../../public/logo.png";
import boiteAffamee from "../../../public/logo.png";
import boitePiegee from "../../../public/logo.png";
import boiteVolante from "../../../public/logo.png";
import boiteColossale from "../../../public/logo.png";
import { usePointsStore } from "../../utils/pointsStore.ts";
import { useAppWebSocket } from "../../utils/useAppWebSocket.ts";
import {
	type WebsocketCommunicationC2SType,
	WebsocketEventC2SEnum,
} from "../../utils/WebsocketCommunicationC2SType.ts";

// Un seul type pour les mobs
interface MobType {
	_id: string;
	cost: string;
	name: string;
	life: string;
	damage: number;
}

export default function Shop() {
	const [username, setUsername] = useState("MAITRE AXEL");
	const [email, setEmail] = useState("test@gamil.com");
	const [isUserSaved, setIsUserSaved] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [popupMessage, setPopupMessage] = useState("");
	const [popupType, setPopupType] = useState<"success" | "error">("success");
	const [animateCredits, setAnimateCredits] = useState(false);
	const { isOpen, sendJsonMessage } = useAppWebSocket({ autoSyn: true, email });
	const [mobs, setMobs] = useState<MobType[]>([]);
	const points = usePointsStore((state) => state.points);
	const setPoints = usePointsStore((state) => state.setPoints);

	// Fonction pour récupérer l'image basée sur le nom
	const getMobImage = (name: string): string => {
		const n = name.toLowerCase();
		if (n.includes("affamee")) return boiteAffamee;
		if (n.includes("piegee")) return boitePiegee;
		if (n.includes("volante")) return boiteVolante;
		if (n.includes("colossale")) return boiteColossale;
		return boiteAffamee;
	};

	// Fonction pour afficher une popup
	const showPopupMessage = (message: string, type: "success" | "error") => {
		setPopupMessage(message);
		setPopupType(type);
		setShowPopup(true);
		setTimeout(() => setShowPopup(false), 3000);
	};

	// Animation des crédits
	const animateCreditsDecrease = () => {
		setAnimateCredits(true);
		setTimeout(() => setAnimateCredits(false), 600);
	};

	const handleClick = (mobName: string, mobCost: string) => {
		const cost = parseInt(mobCost);

		// Vérifier si assez de crédits
		if (points < cost) {
			showPopupMessage(
				`Pas assez de crédits ! Il vous faut ${cost} crédits pour invoquer ${mobName}.`,
				"error",
			);
			return;
		}

		// Déduire les crédits
		const newCredits = points - cost;
		setPoints(newCredits);
		localStorage.setItem("credits", newCredits.toString());

		// Animation et popup de succès
		animateCreditsDecrease();
		showPopupMessage(
			`${mobName} invoqué avec succès ! -${cost} crédits`,
			"success",
		);

		// Envoyer le message websocket
		const msg: WebsocketCommunicationC2SType = {
			event: WebsocketEventC2SEnum.MONSTER_BOUGHT,
			data: { monsterName: mobName, userEmail: email },
		};
		sendJsonMessage(msg);
	};

	// Récupérer les mobs depuis l'API
	useEffect(() => {
		const fetchMobs = async () => {
			try {
				const URL = import.meta.env.VITE_API_BASE_URL;
				const response = await fetch(`${URL}/api/mobtypes`);

				const data: MobType[] = await response.json();
				setMobs(data);
			} catch (error) {
				console.error("Erreur lors de la récupération des mobs:", error);
				// Fallback avec des données par défaut
				setMobs([
					{
						_id: "1",
						name: "BOITE AFFAMÉE",
						cost: "10",
						life: "50",
						damage: 10,
					},
					{
						_id: "2",
						name: "BOITE PIÉGÉE",
						cost: "30",
						life: "50",
						damage: 10,
					},
					{
						_id: "3",
						name: "BOITE VOLANTE",
						cost: "50",
						life: "50",
						damage: 10,
					},
					{
						_id: "4",
						name: "BOITE COLOSSALE",
						cost: "200",
						life: "50",
						damage: 10,
					},
				]);
			}
		};

		fetchMobs();

		// Load localStorage data
		const storedUsername = localStorage.getItem("username");
		const storedEmail = localStorage.getItem("email");
		const storedCredits = localStorage.getItem("credits");

		if (storedUsername) setUsername(storedUsername);
		if (storedEmail) setEmail(storedEmail);
		// Si pas de crédits stockés, on utilise la valeur par défaut (125)
		if (storedCredits) {
			setPoints(parseInt(storedCredits));
		} else {
			// Sauvegarder les crédits par défaut dans localStorage

			localStorage.setItem("credits", "125");
		}
	}, []);

	// Save to database when values change
	useEffect(() => {
		if (username !== "MAITRE AXEL" && email !== "test@gmail.com") {
			if (localStorage.getItem("exist") === "false") {
				saveUserToDatabase();
				localStorage.setItem("exist", "true");
			}
		}
	}, [username, email]);

	const saveUserToDatabase = async () => {
		if (
			isUserSaved ||
			(username === "MAITRE AXEL" && email === "test@gmail.com")
		) {
			return;
		}
		try {
			const userData: UserData = {
				mail: email,
				pseudo: username,
			};

			await createUser(userData);
			setIsUserSaved(true);
		} catch (error) {
			console.error("Error saving user to DB:", error);
		}
	};

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
						<img src={avatar} alt="Maitre Axel" className="user-avatar" />
						<div>
							<p className="user-name">{username.toUpperCase()}</p>
							<p className="user-email">{email}</p>
						</div>
					</div>
					<div
						className={`user-credits ${
							animateCredits ? "credits-animate" : ""
						}`}
					>
						{points} CRÉDITS
					</div>
				</div>

				<div className="shop-grid">
					{mobs.map((mob) => (
						<div key={mob._id} className="shop-item-card">
							<img
								src={getMobImage(mob.name)}
								alt={mob.name}
								className="item-image"
							/>
							<p className="item-name">{mob.name.toUpperCase()}</p>
							<p className="item-cost">coût: {mob.cost}</p>
							<button
								disabled={!isOpen || points < parseInt(mob.cost)}
								className={`invoke-button ${
									points >= parseInt(mob.cost) ? "affordable" : ""
								}`}
								onClick={() => handleClick(mob.name, mob.cost)}
							>
								{points < parseInt(mob.cost)
									? "Pas assez de crédits"
									: "Invoquer"}
							</button>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}
