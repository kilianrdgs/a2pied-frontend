import {create} from "zustand";
import {creditService} from "../services/creditService";

type PointsState = {
    points: number;
    isLoading: boolean;
    error: string | null;
    addPoint: () => void;
    removePoints: (amount: number) => void;
    resetPoints: () => void;
    setPoints: (value: number) => void;
    loadCreditsFromBackend: () => Promise<void>;
    syncToBackend: (points: number) => Promise<void>;
};

export const usePointsStore = create<PointsState>((set, get) => ({
    points: 0,
    isLoading: false,
    error: null,

    addPoint: () =>
        set((state) => {
            const newPoints = state.points + 1;
            if (newPoints % 5 === 0) get().syncToBackend(newPoints);

            return {points: newPoints, error: null};
        }),

    removePoints: (amount: number) =>
        set((state) => {
            const newPoints = Math.max(state.points - amount, 0);

            // Sauvegarder si on a retiré des points
            if (newPoints !== state.points) {
                get().syncToBackend(newPoints);
            }

            return {points: newPoints, error: null};
        }),

    resetPoints: () => {
        set({points: 0, error: null});
        get().syncToBackend(0);
    },

    setPoints: (value: number) => {
        set({points: value, error: null});
        get().syncToBackend(value);
    },

    // Charger les crédits depuis le backend au démarrage
    loadCreditsFromBackend: async () => {
        set({isLoading: true, error: null});

        try {
            const response = await creditService.getCredits();
            const credits = response.credits || 0;

            set({
                points: credits,
                isLoading: false,
                error: null
            });

            console.log('Credits loaded from backend:', credits);
        } catch (error) {
            console.error('Failed to load credits from backend:', error);

            // Fallback vers localStorage
            const localCredits = localStorage.getItem("credits");
            const points = localCredits ? parseInt(localCredits, 10) : 0;

            set({
                points,
                isLoading: false,
                error: 'Failed to load from backend, using local data'
            });
        }
    },

    // Synchroniser avec le backend
    syncToBackend: async (points: number) => {
        try {
            await creditService.saveCredits(points);
            console.log(`Credits saved to backend: ${points}`);

            // Optionnel: retirer l'erreur si la sync réussit
            set({error: null});
        } catch (error) {
            console.error('Failed to save to backend:', error);

            // Fallback vers localStorage
            localStorage.setItem("credits", points.toString());

            set({
                error: 'Backend unavailable, saved locally'
            });
        }
    },
}));