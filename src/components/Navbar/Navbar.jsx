import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faArrowRightToBracket, faPaw } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg mb-2 " id='navbar'>
            <div className="container-fluid">
                <p className="navbar-brand border border-0 bg-transparent ms-2 " id='navbar-brand'> MAPet</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ms-4" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0" id='navbar-button' exact to="/" activeClassName="active">
                            <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0" id='navbar-button' to="/lost-pets" activeClassName="active">
                            <span>Lost Pets</span> <FontAwesomeIcon icon={faCalendarDays} id='icon'/>
                            </NavLink>

                        </li>
                    </ul>
                    <ul className="navbar-nav" id='navbar-left'>
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0" id='navbar-button' to="/login" activeClassName="active">
                            <span >Login</span> <FontAwesomeIcon icon={faArrowRightToBracket} id='icon'/>
                            </NavLink>
                        </li>
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0" id='navbar-button' to="/register" activeClassName="active">
                            <span >Register</span> <FontAwesomeIcon icon={faPaw} id='icon'/>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default  Navbar
