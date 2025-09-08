import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

export default function LogEmail() {
  const [email, setEmail] = useState("");
    const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    localStorage.setItem("email", email);
    navigate('/FootFactorLogin');
  };

  return (
    <div className=" flex flex-col items-center justify-center">
      <motion.img
        src="/logo.png"
        alt="Foot Factor Logo"
        style={{ width: "140px", height: "auto" }}
        className=" mb-2"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
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
          className="w-56 px-3 py-2 bg-black text-red-600 border border-red-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Entrez votre email"
          required
        />
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
