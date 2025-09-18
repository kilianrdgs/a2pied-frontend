"use client";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { usePointsStore } from "../../utils/pointsStore.ts";
import {
  type AvailableUpgrade,
  useUpgradesStore,
} from "../../utils/upgradesStore.ts";
import UpgradeCard from "./upgradeCard/UpgradeCard.tsx";
import useUpgradeEffect from "./upgrades/useUpgrade.tsx";

export default function UpgradeSystem() {
  const {
    availablesUpgrades,
    getAvailablesUpgrades,
    userUpgrades,
    getUserUpgrades,
    isBuying,
  } = useUpgradesStore();
  useEffect(() => {
    getAvailablesUpgrades();
    getUserUpgrades();
  }, []);

  const navigate = useNavigate();

  const { points: credits } = usePointsStore();
  useUpgradeEffect();

  const levelByName = useMemo(() => {
    const map = new Map<string, number>();
    userUpgrades.forEach((u) => map.set(u.name, u.level));
    return map;
  }, [userUpgrades]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflowX: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 5,
        }}
      >
        <h3
          style={{
            alignSelf: "start",
            marginLeft: 5,
            color: "red",
          }}
        >
          Améliorations
        </h3>
        <button
          onClick={() => navigate("/actif")}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "0px 15px",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Actifs
        </button>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          overflowX: "scroll",
        }}
      >
        {availablesUpgrades.map((available: AvailableUpgrade) => (
          <UpgradeCard
            key={`Available-${available.name}`}
            available={available}
            userLevel={levelByName.get(available.name) ?? 0}
            credits={credits}
            isBuying={isBuying}
          />
        ))}
      </div>
      {/* <UpgradesActifs /> */}
    </div>
  );
}
