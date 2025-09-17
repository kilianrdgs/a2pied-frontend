import type {MobType} from "../Shop";
import "./mobsgrid.css";

export default function MobsGrid({
                                     mobs,
                                     isOpen,
                                     points,
                                     onMobClick,
                                 }: {
    mobs: MobType[];
    isOpen: boolean;
    points: number;
    onMobClick: (mobName: string, mobCost: string) => void;
}) {
    return (
        <div className="carousel-container">
            <div className="shop-grid">
                {mobs.map((mob) => (
                    <div className="shop-item-card">
                        <div key={mob._id} className="shop-item-info">
                            <img
                                src="/monster.png"
                                alt={mob.name}
                                className="item-image"
                            />
                            <p className="item-name">{mob.name.toUpperCase()}</p>
                            <p className="item-cost">coût: {mob.cost}</p>
                        </div>
                        <button
                            disabled={!isOpen || points < parseInt(mob.cost, 10)}
                            className={`invoke-button ${
                                points >= parseInt(mob.cost, 10) ? "affordable" : ""
                            }`}
                            onClick={() => onMobClick(mob.name, mob.cost)}
                        >
                            {points < parseInt(mob.cost, 10) ? "Insuffisant" : "Invoquer"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
