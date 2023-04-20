import classe from './formulaire3.module.css'

const Formulaire3 = (props) => {
    return (
        <>
            <div className={classe.form}>
                <div className={classe.noitr}> 
                    <div className={classe.form_container}>
                        <form>
                            <label>
                                Sexe :
                                <input type="radio" name="sexe" value="homme"/>Homme
                                <input type="radio" name="sexe" value="femme"/>Femme
                            </label>
                            <label>
                                Photo de profil :
                                <input type="file" name="photo"/>
                            </label>
                            <div className={classe.btn_div}>
                                <button className={classe.btn_previous} onClick={props.onPrev}>Précedent</button>
                                <button className={classe.btn_inscription} onClick={props.onSubmit}>Soumettre</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Formulaire3