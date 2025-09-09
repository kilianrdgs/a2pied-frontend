import {useEffect, useState} from 'react';
import { createUser } from '../services/api';
import type { UserData } from '../services/api';
import './Shop.css';

import logo from '../../src/assets/logo.png';
import avatar from '../../src/assets/logo.png';
import boiteAffamee from '../../src/assets/logo.png';
import boitePiegee from '../../src/assets/logo.png';
import boiteVolante from '../../src/assets/logo.png';
import boiteColossale from '../../src/assets/logo.png';
// import {WebSocketHandler} from "./WebSocketHandler.tsx";
// import useWebSocket from "react-use-websocket";
// import {getWebSocketURL} from "../utils/getWebSocketURL.ts";

const shopItems = [
    {name: 'BOITE AFFAMÉE', cost: 10, image: boiteAffamee, _id: "1"},
    {name: 'BOITE PIÉGÉE', cost: 30, image: boitePiegee, _id: "2"},
    {name: 'BOITE VOLANTE', cost: 50, image: boiteVolante, _id: "3"},
    {name: 'BOITE COLOSSALE', cost: 200, image: boiteColossale, _id: "4"},
];

function Shop() {
    const [username, setUsername] = useState('MAITRE AXEL');
    const [email, setEmail] = useState('test@gmail.com');
    const [isLoading, setIsLoading] = useState(false);
    const [isUserSaved, setIsUserSaved] = useState(false);
    // const {sendJsonMessage} = useWebSocket(
    //     getWebSocketURL(),
    //     {
    //         share: true,
    //         shouldReconnect: () => true,
    //     },
    // )

    const handleClick = (id: string) => {
        // sendJsonMessage({event: "monsterBought", data: {id: id}})
        console.log('Item clicked:', id); // Alternative pour le debug
    }


    // Load data from localStorage
    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      const storedEmail = localStorage.getItem('email');
      
      if (storedUsername) {
        setUsername(storedUsername);
      }
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }, []);
      // Save to database when values change
      useEffect(() => {
        if (username !== 'MAITRE AXEL' && email !== 'test@gmail.com') {
          saveUserToDatabase();
      }
    }, [username, email]);

    const saveUserToDatabase = async () => {
    // Don't save if already saved or using default values
    if (isUserSaved || (username === 'MAITRE AXEL' && email === 'test@gmail.com')) {
      return;
    }

    setIsLoading(true);
    try {
      const userData: UserData = {
        mail: email,
        pseudo: username
      };
      
      await createUser(userData);
      setIsUserSaved(true);
    } catch (error) {
      console.error('Error saving user to DB:', error);
    } finally {
      setIsLoading(false);
    }
  };
    return (
        <div className="shop-container">
            {/* <WebSocketHandler/> */}
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