import { create } from "zustand";

type PointsState = {
	points: number;
	addPoint: () => void;
	removePoints: (amount: number) => void;
	resetPoints: () => void;
	setPoints: (value: number) => void;
};

export const usePointsStore = create<PointsState>((set) => ({
	points: 0,

	addPoint: () =>
		set((state) => {
			const newPoints = state.points + 1;
			if (newPoints % 10 === 0) {
				localStorage.setItem("credits", newPoints.toString());
			}
			return {
				points: newPoints,
			};
		}),

	removePoints: (amount: number) =>
		set((state) => ({
			points: Math.max(state.points - amount, 0),
		})),

	resetPoints: () => set({ points: 0 }),

	setPoints: (value: number): void => set({ points: value }),
}));
