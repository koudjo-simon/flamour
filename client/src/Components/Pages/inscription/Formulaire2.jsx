import classe from './formulaire2.module.css'

const Formulaire2 = (props) => {

    return (
        <>
            <div className={classe.form}>
                <div className={classe.noitr}> 
                    <div className={classe.form_container}>
                        <form>
                        <table>
                            <tbody>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="profession">Profession:</label></td>
                                    <td><input type="text" 
                                        className={classe.input_auth}
                                        id="nom" name="profession"/></td>
                                </tr>
                            
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="pays">Pays:</label></td>
                                    <td><input type="text" 
                                        className={classe.input_auth}
                                        id="prenom" name="pays"/></td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="ville">Ville:</label></td>
                                    <td><input type="text" 
                                        className={classe.input_auth}
                                        id="pseudo" name="ville"/></td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="date">Date:</label></td>
                                    <td><input className={classe.input_auth}
                                            type="date" id="date" name="date" placeholder="jj/mm/aaaa"/></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={classe.btn_div}>
                            <button className={classe.btn_previous} onClick={props.onPrev}>Précedent</button>
                            <button className={classe.btn_inscription} onClick={props.onNext}>Suivant</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Formulaire2