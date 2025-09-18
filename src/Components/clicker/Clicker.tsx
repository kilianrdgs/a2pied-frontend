import { useState } from "react";
import "./clicker.css";
import logo from "/monster-nobg.png";
import { usePointsStore } from "../../utils/pointsStore";

export default function Clicker() {
	const addPointWithMultiplier = usePointsStore(
		(state) => state.addPointWithMultiplier,
	);

	const [isPulsing, setIsPulsing] = useState(false);

	const handleClick = () => {
		addPointWithMultiplier();
		setIsPulsing(true);
		setTimeout(() => setIsPulsing(false), 200);
	};

	return (
		<div className="clicker-container select-none drag" draggable="false">
			<div
				className="clicker-box select-none"
				draggable="false"
				style={{
					width: "150px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "1rem",
				}}
			>
				<img
					src={logo}
					draggable="false"
					alt="logo"
					className={`clicker-logo ${isPulsing ? "pulse" : ""} select-none`}
					onClick={handleClick}
					style={{ width: "150px", cursor: "pointer", margin: "auto" }}
				/>
			</div>
		</div>
	);
}
