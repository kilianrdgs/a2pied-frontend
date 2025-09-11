import Clicker from "../clicker/Clicker";
import "./panel.css";
import ShopMariem from "../Shop-Mariem.tsx";

export function Panel() {
    return (
        <div className="panel">
            <aside className="panel__left">
                <ShopMariem/>
            </aside>

            <main className="panel__right">
                <Clicker/>
            </main>
        </div>
    );
}

export default Panel;
