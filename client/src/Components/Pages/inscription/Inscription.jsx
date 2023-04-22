import { useState } from "react";
import axios from "axios";

import Formulaire1 from "./Formulaire1";
import Formulaire2 from "./Formulaire2";
import Formulaire3 from "./Formulaire3";

const Inscription = () => {

    const [nom, setNom] = useState("Gérald");
    const [prenom, setPrenom] = useState("AMENOUGLO");
    const [pseudo, setPseudo] = useState("kgero");
    const [email, setEmail] = useState("geral@gerald.com");
    const [mdp, setMdp] = useState("12345");
    const [confMdp, setConfMdp] = useState("12345");

    const [profession , setProfession] = useState("Dealeur");
    const [pays, setPays] = useState("USA");
    const [ville, setVille] = useState("CHICAGO");
    const [date, setDate] = useState("");

    const [sexe, setSexe] = useState("M");
    const [photoProfil, setPhotoProfil] = useState("chemin_a_completer");

    const [showForm1, setShowForm1] = useState(true);
    const [showForm2, setShowForm2] = useState(false);
    const [showForm3, setShowForm3] = useState(false);

    const handleInscription = (e) => {
        e.preventDefault();
        let inscriptionFormData = {
            nom,
            prenom,
            pseudo,
            email,
            mdp,
            confMdp,
            profession,
            pays,
            ville,
            date,
            sexe,
            photoProfil,
        }
        console.log(JSON.stringify(inscriptionFormData));
        axios.post("http://localhost:5000/user/signup", inscriptionFormData)
            .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    console.error("erreur");
                });
    }

    return (
        <div>
            {
                showForm1 ? <Formulaire1 
                                setShowForm1={setShowForm1} 
                                setShowForm2={setShowForm2} 
                                nom={nom}
                                prenom={prenom}
                                pseudo={pseudo}
                                email={email}
                                mdp={mdp}
                                confMdp={confMdp}
                                setNom={setNom}
                                setPrenom={setPrenom}
                                setPseudo={setPseudo}
                                setEmail={setEmail}
                                setMdp={setMdp}
                                setConfMdp={setConfMdp}

                                /> : null
            }
            {
                showForm2 ? <Formulaire2
                    setShowForm1={setShowForm1} 
                    setShowForm2={setShowForm2}
                    setShowForm3={setShowForm3}
                    profession={profession}
                    pays={pays}
                    ville={ville}
                    date={date}
                    setProfession={setProfession}
                    setPays={setPays}
                    setVille={setVille}
                    setDate={setDate}
                                /> : null
            }
            {
                showForm3 ? <Formulaire3
                        setShowForm2={setShowForm2} 
                        setShowForm3={setShowForm3}
                        sexe={sexe}
                        photoProfil={photoProfil}
                        setSexe={setSexe}
                        setPhotoProfil={setPhotoProfil}
                        handleInscription={handleInscription}
                    /> : null
            }
        </div>
    );
}

export default Inscription;