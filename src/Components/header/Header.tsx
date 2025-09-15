import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/logo.png";

import "./header.css";

export default function Header() {
	const [_popupMessage, setPopupMessage] = useState("");
	const [_popupType, setPopupType] = useState<"success" | "error">("success");
	const [_showPopup, setShowPopup] = useState(false);

	const navigate = useNavigate();

	const showPopupMessage = (message: string, type: "success" | "error") => {
		setPopupMessage(message);
		setPopupType(type);
		setShowPopup(true);
		setTimeout(() => setShowPopup(false), 3000);
	};

	// Fonction de déconnexion
	const handleLogout = () => {
		localStorage.removeItem("email");
		localStorage.removeItem("username");
		localStorage.removeItem("exist");
		localStorage.removeItem("credits");

		showPopupMessage("Déconnexion réussie !", "success");

		setTimeout(() => {
			navigate("/");
		}, 500);
	};

	return (
		<header className="shop-header">
			<div className="shop-header-left">
				<img src={logo} alt="Foot Factor Logo" className="shop-logo" />
				<h1>FOOT FACTOR</h1>
			</div>

			<button
				className="logout-button logout-button-desktop"
				onClick={handleLogout}
			>
				Se déconnecter
			</button>
		</header>
	);
}
