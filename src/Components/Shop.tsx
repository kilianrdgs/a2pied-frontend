import {useEffect, useState} from 'react';
import './Shop.css';

import logo from '../../public/logo.png';
import avatar from '../../public/logo.png';
import boiteAffamee from '../../public/logo.png';
import boitePiegee from '../../public/logo.png';
import boiteVolante from '../../public/logo.png';
import boiteColossale from '../../public/logo.png';
import {WebSocketHandler} from "./WebSocketHandler.tsx";
import useWebSocket from "react-use-websocket";
import {getWebSocketURL} from "../utils/getWebSocketURL.ts";

const shopItems = [
    {name: 'BOITE AFFAMÉE', cost: 10, image: boiteAffamee, _id: "1"},
    {name: 'BOITE PIÉGÉE', cost: 30, image: boitePiegee, _id: "2"},
    {name: 'BOITE VOLANTE', cost: 50, image: boiteVolante, _id: "3"},
    {name: 'BOITE COLOSSALE', cost: 200, image: boiteColossale, _id: "4"},
];

function Shop() {
    const [username, setUsername] = useState('MAITRE AXEL');
    const [email, setEmail] = useState('test@gmail.com');
    const {sendJsonMessage} = useWebSocket(
        getWebSocketURL(),
        {
            share: true,
            shouldReconnect: () => true,
        },
    )

    const handleClick = (id) => {
        sendJsonMessage({event: "monsterBought", data: {id: id}})

    }


    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);
    return (
        <div className="shop-container">
            <WebSocketHandler/>
            <header className="shop-header">
                <img src={logo} alt="Foot Factor Logo" className="shop-logo"/>
                <h1>FOOT FACTOR</h1>
            </header>

            <main className="shop-main">
                <div className="user-info-bar">
                    <div className="user-details">
                        <img src={avatar} alt="Maitre Axel" className="user-avatar"/>
                        <div>
                            <p className="user-name">{username.toUpperCase()}</p>
                            <p className="user-email">{email}</p>
                        </div>
                    </div>
                    <div className="user-credits">
                        125 CRÉDITS
                    </div>
                </div>

                <div className="shop-grid">
                    {shopItems.map((item) => (
                        <div key={item.name} className="shop-item-card">
                            <img src={item.image} alt={item.name} className="item-image"/>
                            <p className="item-name">{item.name}</p>
                            <p className="item-cost">coût: {item.cost}</p>
                            <button className="invoke-button" onClick={() => handleClick(item._id)}>invoquer</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Shop;