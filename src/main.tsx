import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import { Navigate } from "react-router-dom";
import "./index.css";
import FootFactorLogin from "./Components/FootFactorLogin";
import Shop from "./Components/Shop";
import LogEmail from "./Components/LogEmail.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LogEmail/>}/>
            <Route path="/FootFactorLogin" element={<FootFactorLogin/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

    </BrowserRouter>,
);
