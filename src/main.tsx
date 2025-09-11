import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import FootFactorLogin from "./Components/FootFactorLogin";
import LogEmail from "./Components/LogEmail.tsx";
import Panel from "./Components/panel/Panel.tsx";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<LogEmail />} />
			<Route path="/FootFactorLogin" element={<FootFactorLogin />} />
			<Route path="/panel" element={<Panel />} />
		</Routes>
	</BrowserRouter>,
);
