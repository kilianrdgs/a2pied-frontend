export const getUpgradeIcon = (upgradeKey: string): string => {
	switch (upgradeKey) {
		case "AUTO_CREDIT":
			return "⚡";
		case "BUY_5_IN_A_ROW":
			return "📦";
		case "CREDIT_MULTIPLIER":
			return "✨";
		default:
			return "🔧";
	}
};

export const getUpgradeName = (upgradeKey: string): string => {
	switch (upgradeKey) {
		case "AUTO_CREDIT":
			return "Auto points";
		case "BUY_5_IN_A_ROW":
			return "Achat x5";
		case "CREDIT_MULTIPLIER":
			return "MultiPoints";
		default:
			return upgradeKey;
	}
};

export const getUpgradeEffect = (upgradeKey: string, level: number): string => {
	switch (upgradeKey) {
		case "AUTO_CREDIT":
			return `+1/${Math.max(1, 6 - level)}sec`;
		case "BUY_5_IN_A_ROW":
		case "BUY_10_IN_A_ROW":
			return level > 0 ? "ACTIF" : "INACTIF";
		case "CREDIT_MULTIPLIER":
			return `x${(1 + level).toFixed(2)}`;
		default:
			return "";
	}
};
