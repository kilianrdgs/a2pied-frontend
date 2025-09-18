"use client"
import {useEffect} from "react"
import {usePointsStore} from "../../utils/pointsStore.ts";
import {useUpgradesStore} from "../../utils/upgradesStore.ts";
import useUpgradeEffect from "./upgrades/useUpgrade.tsx";


export default function UpgradeSystem() {

    const {availablesUpgrades, getAvailablesUpgrades, userUpgrades, getUserUpgrades, buyUpgrade} = useUpgradesStore()
    useEffect(() => {
        getAvailablesUpgrades()
        getUserUpgrades()
    }, [])

    const {points: credits} = usePointsStore()
    useUpgradeEffect()
    const getUpgradeIcon = (upgradeKey: string): string => {
        switch (upgradeKey) {
            case "AUTO_CREDIT":
                return "⚡"
            case "BUY_5_IN_A_ROW":
                return "📦"
            case "BUY_10_IN_A_ROW":
                return "📦📦"
            case "CREDIT_MULTIPLIER":
                return "✨"
            default:
                return "🔧"
        }
    }

    const getUpgradeName = (upgradeKey: string): string => {
        switch (upgradeKey) {
            case "AUTO_CREDIT":
                return "Générateur de crédit"
            case "BUY_5_IN_A_ROW":
                return "ACHAT x5"
            case "BUY_10_IN_A_ROW":
                return "ACHAT x10"
            case "CREDIT_MULTIPLIER":
                return "MULTIPLICATEUR"
            default:
                return upgradeKey
        }
    }

    const getUpgradeEffect = (upgradeKey: string, level: number): string => {
        switch (upgradeKey) {
            case "AUTO_CREDIT":
                return `+1/${6 - level}sec`
            case "BUY_5_IN_A_ROW":
                return level > 0 ? "ACTIF" : "INACTIF"
            case "BUY_10_IN_A_ROW":
                return level > 0 ? "ACTIF" : "INACTIF"
            case "CREDIT_MULTIPLIER":
                return `x${(1 + level * 0.25).toFixed(2)}`
            default:
                return ""
        }
    }
    return (
        <div className="bg-black border-2 border-red-500 p-3 sm:p-6 font-mono text-red-500">
            <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-red-400 mb-2">AMÉLIORATIONS</h2>
                <div className="h-px bg-red-500 w-full"></div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">

                {(availablesUpgrades).map((availableUpgrade) => {
                    const currentLevel = userUpgrades.find((userUpdate) => userUpdate.name === availableUpgrade.name)?.level || 0
                    const canAfford = credits >= availableUpgrade.nextCost
                    const isMaxLevel = currentLevel >= availableUpgrade.maxLevel
                    const effect = getUpgradeEffect(availableUpgrade.name, currentLevel)

                    return (
                        <div
                            key={`Available-${availableUpgrade.name}`}
                            className={`border-2 p-3 sm:p-4 rounded-lg transition-all duration-300 ${
                                isMaxLevel
                                    ? "border-green-500 bg-green-900/20"
                                    : canAfford
                                        ? "border-red-500 hover:border-red-400 hover:bg-red-900/10"
                                        : "border-gray-600 bg-gray-900/50"
                            }`}
                        >
                            <div
                                className="flex items-start sm:items-center justify-between mb-3 flex-col sm:flex-row gap-2 sm:gap-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <span className="text-xl sm:text-2xl">{getUpgradeIcon(availableUpgrade.name)}</span>
                                    <div>
                                        <h3 className="text-sm sm:text-lg font-bold">{getUpgradeName(availableUpgrade.name)}</h3>
                                        <p className="text-xs text-red-300">{availableUpgrade.description}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs sm:text-sm font-bold">
                                        NIV. {currentLevel}/{availableUpgrade.maxLevel}
                                    </div>
                                    {effect && <div className="text-xs text-yellow-400">{effect}</div>}
                                </div>
                            </div>

                            {isMaxLevel ? (
                                <div
                                    className="w-full py-2 px-3 sm:px-4 border-2 border-green-500 text-green-500 text-center font-bold rounded text-xs sm:text-sm">
                                    ✓ NIVEAU MAX ATTEINT
                                </div>
                            ) : (
                                <button
                                    onClick={() => buyUpgrade(availableUpgrade)}
                                    disabled={!canAfford}
                                    className={`w-full py-2 px-3 sm:px-4 border-2 font-bold transition-all duration-200 rounded text-xs sm:text-sm ${
                                        canAfford
                                            ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-black hover:scale-105 active:scale-95"
                                            : "border-gray-600 text-gray-600 cursor-not-allowed"
                                    }`}
                                >
                                    <span
                                        className="hidden sm:inline">{canAfford ? "ACHETER" : "FONDS INSUFFISANTS"}</span>
                                    <span className="sm:hidden">{canAfford ? "ACHETER" : "INSUFFISANT"}</span>
                                    {" - "}
                                    <span
                                        className="hidden sm:inline">{availableUpgrade.nextCost.toLocaleString()} ₵</span>
                                    <span
                                        className="sm:hidden">{availableUpgrade.nextCost} ₵</span>
                                </button>
                            )}

                            <div className="mt-3">
                                <div className="flex justify-end text-xs text-red-300 mb-1">
                                    <span>
                    {currentLevel}/{availableUpgrade.maxLevel}
                  </span>
                                </div>
                                <div className="w-full bg-gray-800 border border-red-500/30 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-red-600 to-red-400 h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${(currentLevel / availableUpgrade.maxLevel) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>

            {/* Interface des upgrades actifs */}
            <div className="mt-4 sm:mt-6 pt-4 border-t border-red-500/30">
                <h3 className="text-base sm:text-lg font-bold text-red-400 mb-3">AMÉLIORATIONS ACTIVES</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {userUpgrades
                        .map((userUpgrade) => (
                            <div key={`User-${userUpgrade.name}`}
                                 className="bg-red-900/20 border border-red-500/50 p-2 rounded text-center">
                                <div className="text-base sm:text-lg">{getUpgradeIcon(userUpgrade.name)}</div>
                                <div className="text-xs font-bold">{getUpgradeName(userUpgrade.name)}</div>
                                <div
                                    className="text-xs text-yellow-400">{getUpgradeEffect(userUpgrade.name, userUpgrade.level)}</div>
                            </div>
                        ))}
                </div>
                {userUpgrades.length == 0 && (
                    <div className="text-center text-gray-500 py-4 text-sm">Aucune amélioration active</div>
                )}
            </div>
        </div>
    )
}
