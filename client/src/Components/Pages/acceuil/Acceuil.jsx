import { useNavigate } from "react-router-dom";
import classe from "./acceuil.module.css"

function Acceuil(){

    const navigate = useNavigate();

    return (
        <>
            <div className={classe.description}> 
            <div className={classe.description_container}>
                <div className={classe.description_heading}>
                    <h1>L'AMOUR EN UN SEUL CLIC°</h1>
                </div>
                <div className={classe.description_text}>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum, delectus. Natus, quos incidunt omnis atque obcaecati corporis! Eius voluptas aliquid neque, quam error officia incidunt magni, quasi id dicta dignissimos?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil fuga aliquid praesentium? Incidunt, atque alias? Dolorum deleniti modi consequuntur tenetur incidunt quia, minus placeat excepturi similique quod delectus, blanditiis dignissimos?
                    </p>
                </div>
                <div>
                    <button className={classe.btn_inscription} onClick={()=>{
                        navigate("/inscription")
                    }}>S'inscrire</button>
                </div>  
            </div>   

        </div>
        </>
    )
}

export default Acceuil