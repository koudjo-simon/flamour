import classe from './formulaire1.module.css'

const Formulaire1 = (props) => {

    return (
        <>
            <div className={classe.form}>
                <div className={classe.noitr}>
                    <div className={classe.form_container}>
                        <form>
                            <table>
                                <tbody>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="nom"><strong>Nom: </strong></label></td>
                                    <td>
                                        <input type="text"
                                            className={classe.input_auth} id="nom" name="nom"/>
                                        </td>
                                </tr>
                            
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="prenom"><strong> Prénom: </strong> </label></td>
                                    <td>
                                        <input type="text"
                                            className={classe.input_auth} id="prenom" name="prenom"/>
                                    </td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="pseudo"><strong>Pseudo: </strong>  </label></td>
                                    <td>
                                        <input type="text"
                                            className={classe.input_auth} id="pseudo" name="pseudo"/>
                                    </td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="email"><strong>Email:</strong>  </label></td>
                                    <td>
                                        <input type="email"
                                            className={classe.input_auth} id="email" name="email"/>
                                    </td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="mdp"><strong>Mot de passe: </strong>  </label></td>
                                    <td>
                                        <input type="password"
                                            className={classe.input_auth} id="mdp" name="mdp"/>
                                    </td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="confirm_mdp"><strong>Confirmez le mot de passe: </strong>  </label></td>
                                    <td>
                                        <input type="password"
                                            className={classe.input_auth} id="confirm_mdp" name="confirm_mdp"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table> 
                            <button className={classe.btn_inscription} onClick={props.onNext}>Suivant</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Formulaire1;