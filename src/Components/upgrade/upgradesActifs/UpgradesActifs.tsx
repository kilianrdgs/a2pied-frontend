import { useNavigate } from "react-router";
import { useUpgradesStore } from "../../../utils/upgradesStore";
import {
	getUpgradeEffect,
	getUpgradeIcon,
	getUpgradeName,
} from "../upgradeHelpers";

export default function UpgradesActifs() {
	const { userUpgrades } = useUpgradesStore();

	const navigate = useNavigate();

	return (
		<div
			style={{
				display: "flex",
				height: "100vh",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<div>
				<h3 className="text-base sm:text-lg font-bold text-red-400 mb-3">
					AMÉLIORATIONS ACTIVES
				</h3>

				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
					{userUpgrades.map((userUpgrade) => (
						<div
							key={`User-${userUpgrade.name}`}
							className="bg-red-900/20 border border-red-500/50 p-2 rounded text-center"
						>
							<div className="text-base sm:text-lg">
								{getUpgradeIcon(userUpgrade.name)}
							</div>
							<div className="text-xs font-bold">
								{getUpgradeName(userUpgrade.name)}
							</div>
							<div className="text-xs text-yellow-400">
								{getUpgradeEffect(userUpgrade.name, userUpgrade.level)}
							</div>
						</div>
					))}
				</div>
				{userUpgrades.length == 0 && (
					<div className="text-center text-gray-500 py-4 text-sm">
						Aucune amélioration active
					</div>
				)}
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
