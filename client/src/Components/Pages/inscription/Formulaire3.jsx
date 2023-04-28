import classe from './formulaire3.module.css'

const Formulaire3 = ({handleFileChange, setShowForm2, setShowForm3, sexe, setSexe, handleInscription, handleSubmit}) => {

    /* let handleSubmit = (e) => {
        e.preventDefault();
        let data = {sexe, photoProfil};
        console.log(`${JSON.stringify(data)}`);
        setShowForm3(false);
    } */

    let handlePrevious = () => {
        setShowForm2(true);
        setShowForm3(false);
    }

    return (
        <>
            <div className={classe.form}>
                <div className={classe.noitr}> 
                    <div className={classe.form_container}>
                        <form className={classe.inscription_form}>
                            <label>
                                Sexe :
                            </label>
                            <select className={classe.sexe_select} name="sexe" id="sexe" onChange={(e)=>{setSexe(e.target.value)}}>
                                <option value="F">Feminin</option>
                                <option value="M">Masculin</option>
                            </select><br />
                            <label>Profil : </label>
                            <input className={classe.input_file} type="file" onClick={handleFileChange} />
                            <div className={classe.btn_div}>
                                <button className={classe.btn_previous} onClick={()=>{handlePrevious()}}>Précedent</button>
                                <button className={classe.btn_inscription} onClick={(event)=> {handleSubmit(event)}}>Soumettre</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Formulaire3