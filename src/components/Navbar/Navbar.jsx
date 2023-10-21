import './Navbar.css'
import React, {useContext} from 'react';
import { MyContext } from '../../context/MyProvider';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { isLogin, setIsLogin, currentUser } = useContext(MyContext);

    const logout = async() => {
        localStorage.clear()
        setIsLogin(false);
        navigate("/logout");
    }
    return(
        <nav className="navbar navbar-expand-lg" id='navbar'>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img className="logo" src="/assets/img/mapet.svg" alt="MAPet"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ms-4" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0 nav-link" id='navbar-button' to="/" activeclassname="active">
                            <span>Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0 nav-link" id='navbar-button' to="/lost-pets" activeclassname="active">
                            <span>Lost Pets</span> <span className="material-symbols-outlined">newspaper</span>
                            </NavLink>

                        </li>
                    </ul>
                    {!isLogin && <ul className="navbar-nav" id='navbar-left'>
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0 nav-link" id='navbar-button' to="/login" activeclassname="active">
                            <span >Login</span> <span className="material-symbols-outlined">login</span>
                            </NavLink>
                        </li>
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0 nav-link" id='navbar-button' to="/register" activeclassname="active">
                            <span >Register</span> <span className="material-symbols-outlined">pets</span>
                            </NavLink>
                        </li>
                    </ul>}
                    {isLogin && <ul className="navbar-nav" id='navbar-left'>
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0 nav-link" id='navbar-button' to={`/my-pets`} activeclassname="active">
                            <span >Your Pets</span> <span className="material-symbols-outlined">sound_detection_dog_barking</span>
                            </NavLink>
                        </li>
                        <li className="nav-item" id='nav-item'>
                            <NavLink className="btn border border-0 nav-link" id='navbar-button' to={`/user-profile/${currentUser}/profile`} activeclassname="active">
                            <span >Profile</span> <span className="material-symbols-outlined">account_circle</span>
                            </NavLink>
                        </li>
                        <li className="nav-item" id='nav-item' style={{cursor: 'pointer'}} onClick={logout}>
                            <div className="btn border border-0" id='navbar-button'>
                            <span >Logout</span> <span className="material-symbols-outlined">logout</span>
                            </div>
                        </li>
                    </ul>}
                </div>
            </div>
        </nav>
    )
}

export default  Navbar
