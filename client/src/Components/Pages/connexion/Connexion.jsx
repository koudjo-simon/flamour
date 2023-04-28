import { useState } from 'react';
import axios from "axios"

import styles from './connexion.module.css'
import { useNavigate } from 'react-router-dom';
import Header2 from '../../Layouts/header/Header2';

const Connexion = ({setUserInfo, inscriptionPseudo}) => {

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
        <div className={styles.connexion_container}>
            <Header2 />
            <div className={styles.general}>
                {
                    inscriptionPseudo && <h1 className={styles.heading_welcome}> {`Bienvenue ${inscriptionPseudo}, connectez vous pour commencer.`} </h1>
                }
                <div className={styles.background}>
                    <div className={styles.noitr}>
                        <div className={styles.carre}>
                            <form onSubmit={(e) => {handleSubmit(e)}}>
                                <div className={styles.r}>
                                    <label htmlFor="pseudo">Pseudo : </label>
                                    <input type="text" className={styles.input_pseudo} name="pseudo" id="pseudo" 
                                        value={pseudo}
                                        onInput={(e)=>{setPseudo(e.target.value)}}
                                    />
                                </div>
                                <br /><br /><br />
                                <div className={styles.r}>
                                    <label htmlFor="password">Mot de passe :</label>
                                    <input type="password" className={styles.input_pwd} name="motdepass" id="password" 
                                        value={mdp}
                                        onInput={(e)=>{setMdp(e.target.value)}}
                                    />
                                </div>
                                <br /><br />
                                <div className={styles.bouton}>
                                    <button className={styles.btn_connexion}>connexion</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connexion;