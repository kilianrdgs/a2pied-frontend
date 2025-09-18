import "./upgradeCard.css";

import { getUpgradeEffect, getUpgradeName } from "../upgradeHelpers";
import {
  useUpgradesStore,
  type AvailableUpgrade,
} from "../../../utils/upgradesStore";

("../../../utils/upgradesStore.ts");

type UpgradeCardProps = {
  available: AvailableUpgrade;
  userLevel: number; // niveau actuel de l’utilisateur pour cette upgrade
  credits: number; // points/credits actuels
  isBuying: boolean; // état d’achat global
};

export default function UpgradeCard({
  available,
  userLevel,
  credits,
  isBuying,
}: UpgradeCardProps) {
  const canAfford = credits >= available.nextCost;
  const isMaxLevel = userLevel >= available.maxLevel;
  const effect = getUpgradeEffect(available.name, userLevel);
  const { buyUpgrade } = useUpgradesStore();

  return (
    <div
      className={`upgrade-card transition-all duration-300 ${
        isMaxLevel
          ? "border-green-500 bg-green-900/20"
          : canAfford
          ? "border-red-500 hover:border-red-400 hover:bg-red-900/10"
          : "border-gray-600 bg-gray-900/50"
      }`}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 5,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h3
            style={{ alignSelf: "start" }}
            className="text-sm sm:text-lg font-bold"
          >
            {getUpgradeName(available.name)}
          </h3>
          <p style={{ alignSelf: "start" }} className="text-xs text-red-300">
            {available.description}
          </p>
        </div>
        <div style={{ alignSelf: "start", display: "flex", gap: 10 }}>
          <div className="text-xs sm:text-sm font-bold">
            NIV. {userLevel}/{available.maxLevel}
          </div>
          {effect && <div className="text-xs text-yellow-400">{effect}</div>}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {isMaxLevel ? (
          <div className="w-full py-2 px-3 sm:px-4 border-2 border-green-500 text-green-500 text-center font-bold rounded text-xs sm:text-sm">
            ✓ NIVEAU MAX ATTEINT
          </div>
        ) : (
          <button
            onClick={() => buyUpgrade(available)}
            disabled={!canAfford || isBuying}
            className={`w-full py-2 px-3 sm:px-4 border-2 font-bold transition-all duration-200 rounded text-xs sm:text-sm ${
              canAfford
                ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:scale-105 active:scale-95"
                : "border-gray-600 text-gray-600 cursor-not-allowed"
            }`}
          >
            <span className="hidden sm:inline">
              {canAfford ? "ACHETER" : "FONDS INSUFFISANTS"}
            </span>
            <span className="sm:hidden">
              {canAfford ? "ACHETER" : "INSUFFISANT"}
            </span>
            {" - "}
            <span className="hidden sm:inline">
              {available.nextCost.toLocaleString()} ₵
            </span>
            <span className="sm:hidden">{available.nextCost} ₵</span>
          </button>
        )}

        <div className="w-full bg-gray-800 border border-red-500/30 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-500"
            style={{
              width: `${(userLevel / available.maxLevel) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
