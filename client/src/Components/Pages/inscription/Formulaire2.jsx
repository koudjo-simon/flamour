import classe from './formulaire2.module.css'

const Formulaire2 = ({setShowForm1, setShowForm2, setShowForm3, profession, pays, ville, date, setProfession, setPays, setVille, setDate}) => {

    let handleSubmit = (e) => {
        e.preventDefault();
        let data = {profession, pays, ville, date};
        console.log(`${JSON.stringify(data)}`);
        setShowForm3(true);
        setShowForm2(false);
    }

    let handlePrevious = () => {
        setShowForm1(true);
        setShowForm2(false);
    }

    return (
        <>
            <div className={classe.form}>
                <div className={classe.noitr}> 
                    <div className={classe.form_container}>
                        <form className={classe.inscription_form}>
                        <table>
                            <tbody>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="profession">Profession:</label></td>
                                    <td><input type="text" 
                                        value={profession}
                                        className={classe.input_auth}
                                        onChange={(e)=>{setProfession(e.target.value)}}
                                             required
                                        id="nom" name="profession"/></td>
                                </tr>
                            
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="pays">Pays:</label></td>
                                    <td><input type="text" 
                                        value={pays}
                                        className={classe.input_auth}
                                        onChange={(e)=>{setPays(e.target.value)}}
                                             required
                                        id="prenom" name="pays"/></td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="ville">Ville:</label></td>
                                    <td><input type="text" 
                                        value={ville}
                                        className={classe.input_auth}
                                        onChange={(e)=>{setVille(e.target.value)}}
                                             required
                                        id="pseudo" name="ville"/></td>
                                </tr>
                                <tr className={classe.form_tr_mb}>
                                    <td className={classe.label_td}><label htmlFor="date">Date:</label></td>
                                    <td><input className={classe.input_auth}
                                            value={date}
                                            type="date" id="date" name="date" placeholder="jj/mm/aaaa" 
                                            onChange={(e)=>{setDate(e.target.value)}}
                                            required
                                            /></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={classe.btn_div}>
                            <button className={classe.btn_previous} onClick={()=>{handlePrevious()}}>Précedent</button>
                            <button className={classe.btn_inscription} type='submit' onClick={(e)=>{handleSubmit(e)}}>Suivant</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Formulaire2