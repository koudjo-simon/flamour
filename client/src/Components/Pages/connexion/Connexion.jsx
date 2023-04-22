import { useState } from 'react';
import axios from "axios"

import styles from './connexion.module.css'

const Connexion = () => {

    const [pseudo, setPseudo] = useState("");
    const [mdp, setMdp] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {pseudo, mdp}
        console.log(JSON.stringify(data));
        axios.post("http://localhost:5000/user/login", data)
            .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    console.error("erreur");
                });
    }

    return (
        <>
            {/* <Header/> */}
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
                        <input type="password" name="mot de pass" id="password" 
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