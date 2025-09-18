import { useEffect } from "react";
import { usePointsStore } from "../../../utils/pointsStore.ts";
import { useUpgradesStore } from "../../../utils/upgradesStore.ts";

function useUpgradeEffect() {
	const { userUpgrades } = useUpgradesStore((state) => state);
	const { setMultiplier, addPoint, multiplier } = usePointsStore(
		(state) => state,
	);
	const canBuy5 = !!userUpgrades.find((upg) => upg.name === "BUY_5_IN_A_ROW");

	const autoCredit = () => {
		const level =
			userUpgrades.find((upg) => upg.name === "AUTO_CREDIT")?.level ?? 0;

		useEffect(() => {
			if (level <= 0) return;

			const interval = setInterval(
				() => {
					addPoint();
				},
				(6 - level) * 1000,
			);

			return () => clearInterval(interval);
		}, [level, addPoint]);
	};

	const checkIfMultiplier = () => {
		const level =
			userUpgrades.find((upg) => upg.name === "CREDIT_MULTIPLIER")?.level ?? 0;

		useEffect(() => {
			if (level <= 0) return;
			setMultiplier(multiplier + level);
		}, [level]);
	};

	autoCredit();
	checkIfMultiplier();

	return { canBuy5 };
}

export default useUpgradeEffect;
