import Clicker from "../clicker/Clicker";
import Header from "../header/Header";
import Shop from "../shop/Shop";
import "./panel.css";

export function Panel() {
	return (
		<div className="panel-container">
			<Header />
			<div className="panel">
				<aside className="panel__left">
					<Shop />
				</aside>

				<main className="panel__right">
					<Clicker />
				</main>
			</div>
		</div>
	);
}

export default Panel;
