const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface UserData {
    mail: string;
    pseudo: string;
}

export const createUser = async (userData: UserData): Promise<any> => {
    try {
        console.log("Envoi des données:", userData);

        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        console.log("Réponse du serveur:", response.status);

        if (!response.ok) {
            let errorMessage = `Erreur serveur: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
            }

            throw new Error(errorMessage);
        }

        const result = await response.json();
        console.log("Utilisateur créé avec succès:", result);
        return result;
    } catch (error: any) {
        console.error("Erreur lors de la création de user:", error);

        if (error.name === "TypeError" && error.message.includes("fetch")) {
            throw new Error(" Impossible de contacter le serveur");
        }

        if (error.message.includes("Erreur serveur")) {
            throw error;
        }

        throw new Error("Erreur inattendue lors de la création de user");
    }
};
