import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import "./index.css";
import FootFactorLogin from "./Components/FootFactorLogin";
import Feed from "./Components/feed/Feed.tsx";
import LogEmail from "./Components/LogEmail.tsx";
import Panel from "./Components/panel/Panel.tsx";
import UpgradesActifs from "./Components/upgrade/upgradesActifs/UpgradesActifs.tsx";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LogEmail />} />
			<Route path="/FootFactorLogin" element={<FootFactorLogin />} />
			<Route path="/panel" element={<Panel />} />
			<Route path="/feed" element={<Feed />} />
			<Route path="/actif" element={<UpgradesActifs />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</BrowserRouter>,
);
