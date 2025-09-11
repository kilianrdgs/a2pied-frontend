import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useNavigate} from "react-router";

export default function LogEmail() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Vérification du localStorage au chargement du composant
    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail) {
            navigate('/panel');
        }
    }, [navigate]);

    // Fonction pour valider le domaine de l'email
    const validateEmail = (email: string) => {
        return email.endsWith("@edu.esiee-it.fr");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Reset l'erreur

        // Validation du domaine
        if (!validateEmail(email)) {
            setError("Veuillez utiliser une adresse email ESIEE-IT (@edu.esiee-it.fr)");
            return;
        }

        try {
            // Fetch de la DB
            const response = await fetch("http://localhost:3000/api/users");
            const users = await response.json();

            // Vérifie si l'email soumis existe dans la DB
            const existingUser = users.find((user: any) => user.mail === email);

            if (existingUser) {
                // Email trouvé dans la DB
                localStorage.setItem("email", existingUser.mail);
                localStorage.setItem("username", existingUser.pseudo);
                localStorage.setItem("exist", "true");

                console.log("Utilisateur trouvé :", existingUser);
                navigate('/shop');
            } else {
                // Pas trouvé
                localStorage.setItem("email", email);
                localStorage.setItem("exist", "false");
                navigate('/FootFactorLogin');
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs :", error);
            setError("Erreur de connexion au serveur. Veuillez réessayer.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <motion.img
                src="/logo.png"
                alt="Foot Factor Logo"
                style={{width: "140px", height: "auto"}}
                className="mb-2"
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{duration: 0.6}}
            />

            <div className="flex flex-col gap-4 items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-black border border-red-600 rounded-lg mt-6 p-6 flex flex-col items-center gap-4 shadow-lg shadow-red-900/40"
                >
                    <label
                        htmlFor="email"
                        className="text-red-600 font-bold tracking-widest"
                    >
                        EMAIL
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-64 px-3 py-2 bg-black text-red-600 border rounded focus:outline-none focus:ring-2 ${
                            error
                                ? 'border-red-400 focus:ring-red-400'
                                : 'border-red-600 focus:ring-red-500'
                        }`}
                        placeholder="nom.prenom@edu.esiee-it.fr"
                        required
                    />

                    {/* Affichage de l'erreur */}
                    {error && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            className="text-red-400 text-sm text-center max-w-64"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="bg-red-700 text-black font-bold px-6 py-2 rounded hover:bg-red-800 transition"
                    >
                        Poursuivre
                    </button>
                </form>
            </div>
        </div>
    );
}
