import { useState } from 'react';
import axios from "axios"

import styles from './connexion.module.css'
import { useNavigate } from 'react-router-dom';
import Header2 from '../../Layouts/header/Header2';

const Connexion = ({setUserInfo}) => {

    const [pseudo, setPseudo] = useState("");
    const [mdp, setMdp] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {pseudo, mdp}
        console.log(JSON.stringify(data));
        axios.post("http://localhost:5000/user/login", data, {
            headers:{"Content-Type":"application/json"}
        })
            .then((response) => {
                    console.log(response.data);
                    localStorage.setItem("token", response.data.accessToken);
                    setUserInfo(response.data.userProfile);
                    navigate("/chat/main");
                })
                .catch((error) => {
                    console.log(error);
                    console.error("erreur");
                });
    }

    return (
        <>
            <Header2 />
            <div className={styles.background}>
        <div className={styles.noitr}>
            <div className={styles.carre}>
                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <div className={styles.r}>
                        <label htmlFor="email">Pseudo : </label>
                        <input type="text" name="email" id="email" 
                            value={pseudo}
                            onInput={(e)=>{setPseudo(e.target.value)}}
                        />
                    </div>
                    <br /><br /><br />
                    <div className={styles.r}>
                        <label htmlFor="password">Mot de passe :</label>
                        <input type="password" name="motdepass" id="password" 
                            value={mdp}
                            onInput={(e)=>{setMdp(e.target.value)}}
                        />
                    </div>
                    <br /><br />
                    <div className={styles.bouton}>
                        <button>connexion</button>   
                    </div>
                </form>
            </div>
        </div>
    </div>
        </>
    );
}

export default Connexion;