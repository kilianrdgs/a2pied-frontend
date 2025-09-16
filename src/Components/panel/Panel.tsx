import Clicker from "../clicker/Clicker";
import Header from "../header/Header";
import Shop from "../shop/Shop";
import "./panel.css";
import {ToastProvider} from "../ToastManager.tsx";
import {useNavigate} from "react-router";

export function Panel() {
    const navigate = useNavigate()
    return (
        <div className="panel-container">
            <ToastProvider>
                {" "}
                <Header/>
                <div className="panel">
                    <aside className="panel__left">
                        <Shop/>
                    </aside>

                    <main className="panel__right">
                        <Clicker/>
                    </main>
                    <button onClick={() => navigate('/feed')}> Feed</button>
                </div>
            </ToastProvider>
        </div>
    );
}

export default Panel;
