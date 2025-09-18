import {useEffect} from 'react';
import {useUpgradesStore} from "../../../utils/upgradesStore.ts";
import {usePointsStore} from "../../../utils/pointsStore.ts";


function useUpgradeEffect() {
    const {userUpgrades} = useUpgradesStore(state => state);
    const {setMultiplier, addPoint, multiplier} = usePointsStore(state => state);
    const canBuy5 = !!userUpgrades.find(upg => upg.name === 'BUY_5_IN_A_ROW')


    const autoCredit = () => {
        const level = userUpgrades.find(upg => upg.name === 'AUTO_CREDIT')?.level ?? 0;

        useEffect(() => {
            //todo : mettre ça a jour
            if (level <= 0) return;

            const creditsPerMinute = 10 * level;
            const creditsPerSecond = creditsPerMinute / 60;

            const interval = setInterval(() => {
                addPoint();
            }, 1000);

            return () => clearInterval(interval);
        }, [level, addPoint]);
    }


    const checkIfMultiplier = () => {
        const level = userUpgrades.find(upg => upg.name === 'CREDIT_MULTIPLIER')?.level ?? 0;


        useEffect(() => {
            if (level <= 0) return;
            setMultiplier(multiplier + (level / 3))

        }, [level]);
    }


    autoCredit()
    checkIfMultiplier()

    return {canBuy5}
}

export default useUpgradeEffect;
