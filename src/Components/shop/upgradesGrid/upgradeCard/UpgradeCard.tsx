import "./UpgradeCard.css";

type UpgradeCardProps = {
	title: string;
	unit: string;
	actual: string;
};

export default function UpgradeCard({ title, unit, actual }: UpgradeCardProps) {
	return (
		<div className="upgrade-grid-card">
			<div>
				<p className="title">{title}</p>
				<p className="unit">{unit}</p>
				<p className="actual">{actual}</p>
			</div>
			<button className="upgrade-grid-button">Améliorer</button>
		</div>
	);
}
