import { create } from "zustand";

type PointsState = {
	points: number;
	addPoint: () => void;
	removePoints: (amount: number) => void;
	resetPoints: () => void;
};

export const usePointsStore = create<PointsState>((set) => ({
	points: 0,

	addPoint: () => set((state) => ({ points: state.points + 1 })),

	removePoints: (amount: number) =>
		set((state) => ({
			points: Math.max(state.points - amount, 0),
		})),

	resetPoints: () => set({ points: 0 }),
}));
