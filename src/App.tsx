import Shop from "./Components/Shop.tsx";
import {ToastProvider} from "./Components/ToastManager.tsx";

function App() {

    return (
        <ToastProvider>
            <Shop/></ToastProvider>
    );
}

export default App;
