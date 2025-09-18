import {create} from "zustand";
import {API_BASE_URL} from "../services/constantes/constantes.ts";
import {usePointsStore} from "./pointsStore.ts";

export type UpgradeName = 'AUTO_CREDIT' | 'BUY_5_IN_A_ROW' | 'BUY_10_IN_A_ROW' | 'CREDIT_MULTIPLIER';

export interface UserUpgrade {
    _id: string
    name: UpgradeName;
    level: number;
    user: string;
}

export interface AvailableUpgrade {
    name: UpgradeName;
    nextLevel: number;    // Le niveau suivant auquel l'utilisateur peut passer
    nextCost: number;     // Le coût pour acheter ce niveau
    description: string;  // Description textuelle de l'upgrade
    maxLevel: number;     // Niveau maximal de cette upgrade
}

export interface UpgradesStoreState {
    userUpgrades: UserUpgrade[];
    setUserUpgrades: (userUpgrades: UserUpgrade[]) => void;
    getUserUpgrades: () => Promise<void>;

    availablesUpgrades: AvailableUpgrade[];
    setAvailablesUpgrades: (availableUpgrades: AvailableUpgrade[]) => void;
    getAvailablesUpgrades: () => Promise<void>

    buyUpgrade: (availableUpgrade: AvailableUpgrade) => Promise<void>,
    updateUpgradeLevel: (id: string, newLevel: number) => Promise<void>;
    createUpgrade: (name: UpgradeName, userEmail: string) => Promise<void>;

    loading: boolean;
    error: string | null;
    reset: () => void;
}

export const useUpgradesStore = create<UpgradesStoreState>((set, get) => ({
    userUpgrades: [],
    loading: false,
    error: null,
    availablesUpgrades: [],
    setAvailablesUpgrades: (availablesUpgrades) => set(() => ({availablesUpgrades})),

    setUserUpgrades: (userUpgrades) => set(() => ({userUpgrades})),

    updateUpgradeLevel: async (id, newLevel) => {

        const response = await fetch(`${API_BASE_URL}/api/upgrades/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                upgradeId: id,
                level: newLevel
            })
        });
        if (!response.ok) {
            set(() => ({
                error: "Une Erreur lors de la mise à jour est survenue"
            }))
        }
    },

    getAvailablesUpgrades: async () => {
        const email = localStorage.getItem('email');
        const response = await fetch(`${API_BASE_URL}/api/upgrades/available/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json()
        set(() => ({availablesUpgrades: json}))
    },
    getUserUpgrades: async () => {
        const email = localStorage.getItem('email');
        const response = await fetch(`${API_BASE_URL}/api/upgrades/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json()
        set(() => ({userUpgrades: json}))
    },

    reset: () => set(() => ({
        userUpgrades: [],
        loading: false,
        error: null,
    })),
    createUpgrade: async (name: UpgradeName, userEmail: string) => {
        const response = await fetch(`${API_BASE_URL}/api/upgrades/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                userEmail: userEmail
            })
        });

        if (!response.ok) set(() => ({error: "erreur lors de l'achat"}))
    }, buyUpgrade: async (availableUpgrade: AvailableUpgrade) => {
        set(() => ({error: ""}));
        const {points, removePoints} = usePointsStore.getState();

        if (points >= availableUpgrade.nextCost) {
            try {
                if (availableUpgrade.nextLevel > 1) {
                    await get().updateUpgradeLevel(
                        get().userUpgrades.find(u => u.name === availableUpgrade.name)?._id ?? '',
                        availableUpgrade.nextLevel
                    );
                } else {
                    const email = localStorage.getItem("email") ?? "";
                    await get().createUpgrade(availableUpgrade.name, email);
                }

                removePoints(availableUpgrade.nextCost);

                await get().getUserUpgrades();
                await get().getAvailablesUpgrades();

            } catch (error) {
                set(() => ({error: "Erreur lors de l'achat"}));
            }
        } else {
            set(() => ({error: "Fonds insuffisants"}));
        }
    }

    /* buyUpgrade: async (availableUpgrade: AvailableUpgrade) => {
         set(() => ({error: ""}))
         const updateCurrentUserUprade = () => {
             const userUpgrade = get().userUpgrades.find((userUpgrade) => userUpgrade.name === availableUpgrade.name)
             if (userUpgrade) get().updateUpgradeLevel(userUpgrade._id, availableUpgrade.nextLevel)
         }

         const createUserUpgrade = () => {
             const email = localStorage.getItem("email") ?? ""
             get().createUpgrade(availableUpgrade.name, email)
         }
         const {points, removePoints} = usePointsStore.getState();
         if (points > availableUpgrade.nextCost) {
             availableUpgrade.nextLevel > 1 ? await updateCurrentUserUprade() : await createUserUpgrade()
             if (!get().error) {

                 console.log('maj update')
                 removePoints(availableUpgrade.nextCost)
                 await get().getUserUpgrades()
                 get().getAvailablesUpgrades()
             }

         }
     }*/
}));
