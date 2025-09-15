import UpgradeCard from "./upgradeCard/UpgradeCard";
import "./upgradeGrid.css";

export default function UpgradesGrid() {
	const upgrades = [
		{
			title: "Réduc. coût monstres",
			unit: "-1pts/niveau (max 10)",
			actual: " -2pts/monstre",
		},
		{ title: "Auto-points", unit: "+1/s (max 5/s)", actual: "Auto: 1 pts/s" },
	];

	return (
		<div className="upgrade-grid">
			<h3 style={{ margin: 5 }}>Améliorations</h3>
			<div className="upgrade-grid-container">
				<UpgradeCard
					title={upgrades[0].title}
					unit={upgrades[0].unit}
					actual={upgrades[0].actual}
				/>
				<UpgradeCard
					title={upgrades[1].title}
					unit={upgrades[1].unit}
					actual={upgrades[1].actual}
				/>
			</div>
		</div>
	);
}
