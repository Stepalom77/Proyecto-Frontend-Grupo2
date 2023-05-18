import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faArrowRightToBracket, faPaw } from '@fortawesome/free-solid-svg-icons'

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
                            <button className="btn border border-0" type="button" id='navbar-button'>
                                <span>Home</span>
                            </button>
                        </li>
                        <li className="nav-item" id='nav-item'>
                            <button className="btn border border-0" type="button" id='navbar-button'>
                                <span>Lost Pets</span> <FontAwesomeIcon icon={faCalendarDays} id='icon'/>
                            </button>
                        </li>
                    </ul>
                    <ul className="navbar-nav" id='navbar-left'>
                        <li className="nav-item" id='nav-item'>
                            <button className="btn border border-0" type="button" id='navbar-button'>
                                <span >Login</span> <FontAwesomeIcon icon={faArrowRightToBracket} id='icon'/>
                            </button>
                        </li>
                        <li className="nav-item" id='nav-item'>
                            <button className="btn border border-0" type="button" id='navbar-button'>
                                <span >Register</span> <FontAwesomeIcon icon={faPaw} id='icon'/>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default  Navbar
