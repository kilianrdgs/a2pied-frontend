import type {MobType} from "../Shop";
import "./mobsgrid.css";
import {MobCard} from "./MobCard.tsx";

export default function MobsGrid({
                                     mobs,
                                     onMobClick,
                                 }: {
    mobs: MobType[];
    onMobClick: (mobName: string, mobCost: string) => void;
}) {
    mobs.sort((a, b) => parseInt(a.cost) - parseInt(b.cost))
    return (
        <div className="carousel-container">
            <div className="shop-grid">
                {mobs.map((mob) => (

                    <MobCard mob={mob} onMobClick={onMobClick} key={mob._id}/>


                ))}
            </div>
        </div>
    );
}
