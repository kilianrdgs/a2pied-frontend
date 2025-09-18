import { API_BASE_URL } from "./constantes/constantes.ts";

class CreditService {
	async saveCredits(credits: number) {
		try {
			const response = await fetch(`${API_BASE_URL}/api/credits/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userEmail: localStorage.getItem("email"),
					credits,
					timestamp: new Date().toISOString(),
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error("Failed to save credits to backend:", error);
			throw error;
		}
	}

	async getCredits() {
		try {
			const response = await fetch(`${API_BASE_URL}/api/credits/get`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userEmail: localStorage.getItem("email"),
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error("Failed to fetch credits:", error);
			throw error;
		}
	}
}

export const creditService = new CreditService();
