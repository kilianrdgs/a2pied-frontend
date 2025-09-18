import {useAppWebSocket} from "../../../utils/useAppWebSocket.ts";
import {usePointsStore} from "../../../utils/pointsStore.ts";
import type {MobType} from "../Shop.tsx";
import useUpgradeEffect from "../../upgrade/upgrades/useUpgrade.tsx";
import {useLoginFromLocalStorage} from "../../../utils/useLoginFromLocalStorage.tsx";


export function Invoke5Button({mob, onMobClick}: {
    mob: MobType,
    onMobClick: (mobName: string, mobCost: string) => void
}) {
    const {canBuy5} = useUpgradeEffect()
    const handleClick = () => {
        for (let i = 0; i < 5; i++) {
            onMobClick(mob.name, mob.cost)
        }
    }
    const costX5: number = parseInt(mob.cost) * 5
    const {email} = useLoginFromLocalStorage()
    const {isOpen} = useAppWebSocket({email});
    const {points} = usePointsStore();
    if (!canBuy5) return null;
    return <button
        disabled={!isOpen || points < costX5}
        className={`invoke-button ${
            points >= costX5 ? "affordable" : ""
        }`}
        onClick={() => handleClick()}
    >
        {"x5"}
    </button>
}
