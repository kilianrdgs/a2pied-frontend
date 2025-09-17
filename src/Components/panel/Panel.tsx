import Clicker from "../clicker/Clicker";
import Header from "../header/Header";
import Shop from "../shop/Shop";
import "./panel.css";
import { ToastProvider } from "../ToastManager.tsx";
import { useNavigate } from "react-router";

export function Panel() {
  return (
    <div className="panel-container">
      <ToastProvider>
        {" "}
        <div className="panel">
          <aside className="panel__left">
            <Shop />
          </aside>

          <main className="panel__right">
            <Clicker />
          </main>
        </div>
      </ToastProvider>
    </div>
  );
}

export default Panel;
