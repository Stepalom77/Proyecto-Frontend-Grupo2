import './Login.css'
import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { MyContext } from '../../context/MyProvider';
import axios from 'axios'
import { API_ROUTE } from '../../helpers/ApiRoute'
import { parseJwt } from '../../helpers/helperFunctions';
const Login = () => {
    const navigate = useNavigate();
    const { setIsLogin, setCurrentUser} = useContext(MyContext);
    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password:'',
    });

    const userLoginChange = (e) => {
        const { name, value } = e.target;
        setUserLoginData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const userLoginSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post(API_ROUTE + 'users/login', userLoginData, {headers: {
            'Content-Type': 'application/json',
        }})
        setUserLoginData({
            email: '',
            password:'',
        })
        const decodedJWT = parseJwt(data.data.token);
        const userName = encodeURIComponent(decodedJWT.name);
        console.log(userName)
        setCurrentUser(userName);
        localStorage.setItem('token', data.data.token)
        setIsLogin(true);
        navigate("/");
      };
    return(
        <div className="container">
            <div className="h1 text-center" id='login-margin-top'>Log <span id="login-header">IN</span></div>
            <form className='mb-3' onSubmit={(e) => userLoginSubmit(e)}>
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faEnvelope} id='icons-login'/> <label htmlFor="emailLogin" className="form-label ms-1">Your Email:</label>
                    <input type="email" className="form-control" id="emailLogin" aria-describedby="emailHelp" placeholder='Enter your email' name='email'
                    onChange={(e) => {
                        userLoginChange(e);
                      }}/>
                </div>
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faLock} id='icons-login'/><label htmlFor="passwordLogin" className="form-label">Enter your password:</label>
                    <input type="password" className="form-control" id="passwordLogin" placeholder='Enter your password' name='password'
                    onChange={(e) => {
                        userLoginChange(e);
                      }}/>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <button type="submit" className="btn" id='login-button'>
                        <span className='pe-1'>Login</span><FontAwesomeIcon icon={faArrowRightToBracket}/>
                    </button>
                </div>

                
            </form>
        </div>
    )
}

export default Login;