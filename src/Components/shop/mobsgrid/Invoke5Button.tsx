import { useState } from "react";
import { usePointsStore } from "../../../utils/pointsStore.ts";
import { useAppWebSocket } from "../../../utils/useAppWebSocket.ts";
import { useLoginFromLocalStorage } from "../../../utils/useLoginFromLocalStorage.tsx";
import useUpgradeEffect from "../../upgrade/upgrades/useUpgrade.tsx";
import type { MobType } from "../Shop.tsx";

export function Invoke5Button({
	mob,
	onMobClick,
}: {
	mob: MobType;
	onMobClick: (mobName: string, mobCost: string) => void;
}) {
	const { canBuy5 } = useUpgradeEffect();
	const [disabled, setDisabled] = useState(false);
	const handleClick = () => {
		setDisabled(true);
		for (let i = 0; i < 5; i++) {
			onMobClick(mob.name, mob.cost);
		}
		setDisabled(false);
	};
	const costX5: number = parseInt(mob.cost) * 5;
	const { email } = useLoginFromLocalStorage();
	const { isOpen } = useAppWebSocket({ email });
	const { points } = usePointsStore();
	if (!canBuy5) return null;
	return (
		<button
			disabled={!isOpen || points < costX5 || disabled}
			className={`invoke-button ${points >= costX5 ? "affordable" : ""}`}
			onClick={() => handleClick()}
		>
			{"x5"}
		</button>
	);
}
