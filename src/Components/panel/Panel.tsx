import Clicker from "../clicker/Clicker";
import Shop from "../shop/Shop";
import "./panel.css";
import { ToastProvider } from "../ToastManager.tsx";
import UpgradeSystem from "../upgrade/UpgradeContainer.tsx";

export function Panel() {
	return (
		<div className="panel-container">
			<ToastProvider>
				<div className="panel">
					<aside className="panel__left">
						<Shop />
					</aside>
					<UpgradeSystem />
					<main className="panel__right">
						<Clicker />
					</main>
				</div>
			</ToastProvider>
		</div>
	);
}

export default Panel;
