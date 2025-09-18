import { useState } from "react";
import { usePointsStore } from "../../../utils/pointsStore.ts";
import { useAppWebSocket } from "../../../utils/useAppWebSocket.ts";
import { useLoginFromLocalStorage } from "../../../utils/useLoginFromLocalStorage.tsx";
import type { MobType } from "../Shop.tsx";
import { Invoke5Button } from "./Invoke5Button.tsx";

type Props = {
	mob: MobType;
	onMobClick: (mobName: string, mobCost: string) => void;
};

export function MobCard({ mob, onMobClick }: Props) {
	const [imgSrc, setImgSrc] = useState(`/monster/${mob.name}.png`);

	const { email } = useLoginFromLocalStorage();
	const { isOpen } = useAppWebSocket({ email });
	const { points } = usePointsStore();
	const fallbackUrl = "/monster-nobg.png";

	return (
		<div className="bg-black p-4 border border-red-200 rounded-lg flex flex-col items-start justify-between">
			<div className="space-y-2 flex flex-col items-start">
				<div className="bg-red-200/20 p-2 rounded-full mx-auto">
					<img
						src={imgSrc}
						alt={mob.name}
						className="item-image"
						onError={() => {
							setImgSrc(fallbackUrl);
						}}
					/>
				</div>

				<p className="item-name">{mob.name.toUpperCase()}</p>
				<div className="border-t border-red-400 flex gap-3 pt-2">
					<div className="text-center">
						<p className="uppercase tracking-wide text-xs ">coût</p>
						<p className="text-yellow-400 text-lg font-bold">{mob.cost}</p>
					</div>
					<div>
						<p className="uppercase tracking-wide text-xs">vie</p>
						<p className="text-green-400 text-lg font-bold">{mob.life}</p>
					</div>
					<div>
						<p className="uppercase tracking-wide text-xs">dégâts</p>
						<p className=" text-red-400 text-lg font-bold">{mob.damage}</p>
					</div>
				</div>
				{/* <span className="text-gray-300 text-xs leading-relaxed tracking-wide text-left">
          {mob.description}
        </span> */}
			</div>
			<div className="flex  gap-2 w-full">
				<button
					disabled={!isOpen || points < parseInt(mob.cost, 10)}
					className={`invoke-button ${
						points >= parseInt(mob.cost, 10) ? "affordable" : ""
					}`}
					onClick={() => onMobClick(mob.name, mob.cost)}
				>
					{points < parseInt(mob.cost, 10) ? "Insuffisant" : "Invoquer"}
				</button>
				<Invoke5Button mob={mob} onMobClick={onMobClick} />
			</div>
		</div>
	);
}
