import classe from './formulaire1.module.css'

const Formulaire1 = ({setShowForm1, setShowForm2, nom, prenom, pseudo, email, mdp, confMdp, setNom, setPrenom, setPseudo, setEmail, setMdp, setConfMdp}) => {

    let handleSubmit = (e) => {
        e.preventDefault();
        let data = {nom, prenom, pseudo, email, mdp, confMdp};
        console.log(`${JSON.stringify(data)}`);
        setShowForm2(true);
        setShowForm1(false);
    }

    return (
        <>
            <div className={classe.form}>
                <div className={classe.noitr}>
                    <div className={classe.form_container}>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <table>
                                <tbody>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="nom"><strong>Nom: </strong></label></td>
                                    <td>
                                        <input type="text"
                                            className={classe.input_auth}
                                            value={nom}
                                            onChange={(e)=>{setNom(e.target.value)}}
                                             id="nom" name="nom" required/>
                                        </td>
                                </tr>
                            
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="prenom"><strong> Prénom: </strong> </label></td>
                                    <td>
                                        <input type="text"
                                            className={classe.input_auth}
                                            value={prenom}
                                            onChange={(e)=>{setPrenom(e.target.value)}}
                                            id="prenom" name="prenom" required/>
                                    </td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="pseudo"><strong>Pseudo: </strong>  </label></td>
                                    <td>
                                        <input type="text"
                                            id="pseudo" name="pseudo"
                                            className={classe.input_auth}
                                            value={pseudo}
                                            onChange={(e)=>{setPseudo(e.target.value)}}
                                             required/>
                                    </td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="email"><strong>Email:</strong>  </label></td>
                                    <td>
                                        <input type="email"
                                            className={classe.input_auth}
                                            value={email}
                                            onChange={(e)=>{setEmail(e.target.value)}}
                                            id="email" name="email" required/>
                                    </td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="mdp"><strong>Mot de passe: </strong>  </label></td>
                                    <td>
                                        <input type="password"
                                            className={classe.input_auth}
                                            value={mdp}
                                            onChange={(e)=>{setMdp(e.target.value)}}
                                            id="mdp" name="mdp" required/>
                                    </td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="confirm_mdp"><strong>Confirmez le mot de passe: </strong>  </label></td>
                                    <td>
                                        <input type="password"
                                            className={classe.input_auth} 
                                            value={confMdp}
                                            onChange={(e)=>{setConfMdp(e.target.value)}}
                                            id="confirm_mdp" name="confirm_mdp" required/>
                                    </td>
                                </tr>
                                </tbody>
                            </table> 
                            <button className={classe.btn_inscription}>Suivant</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Formulaire1;