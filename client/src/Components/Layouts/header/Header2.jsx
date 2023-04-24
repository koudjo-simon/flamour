import { useNavigate } from 'react-router-dom'
import logo from '../../../images/logo.png'
import classe from './header.module.css'
const Header = () => {

    const navigate = useNavigate();

    return (
        <div className={classe.nav_home}>
            <p>
                <img src={logo} alt="logo" style={{width: '45%'}} />  
            </p>
            <p>
                <button onClick={
                    () => {navigate("/inscription");}
                }>
                    Inscription
                </button> 
            </p>
        </div>
    )
}

export default Header