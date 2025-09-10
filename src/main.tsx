import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router";
import "./index.css";
import FootFactorLogin from "./Components/FootFactorLogin";
import LogEmail from "./Components/LogEmail.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LogEmail/>}/>
            <Route path="/FootFactorLogin" element={<FootFactorLogin/>}/>
            <Route path="/shop" element={<App/>}/>
        </Routes>

    </BrowserRouter>,
);
