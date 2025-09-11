import Clicker from "../clicker/Clicker";
import "./panel.css";
import Shop from "../shop/Shop";

export function Panel() {
	return (
		<div className="panel">
			<aside className="panel__left">
				<Shop />
			</aside>

			<main className="panel__right">
				<Clicker />
			</main>
		</div>
	);
}

export default Panel;
