import logo from '../../../images/logo.png'
import classe from './header.module.css'

const Header = () => {
    return (
        <div className={classe.nav_home}>
            <p>
                <img src={logo} alt="image du logo" style={{width: '45%'}} />  
            </p>
            <p>
                <button>
                    <a href="#" style={{'textDecoration': 'none'}}>Connexion </a> 
                </button> 
            </p>
        </div>
    )
}

export default Header