import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import LogEmail from "./Components/LogEmail";
import FootFactorLogin from "./Components/FootFactorLogin";
import Shop from "./Components/Shop";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
    <Routes>
      <Route path="/" element={<LogEmail />} />
      <Route path="/FootFactorLogin" element={<FootFactorLogin />} />
	    <Route path="/shop" element={<Shop/>} />
    </Routes>

  </BrowserRouter>,
);
