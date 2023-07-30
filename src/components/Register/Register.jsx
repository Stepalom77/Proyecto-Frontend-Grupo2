import './Register.css'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { API_ROUTE } from '../../helpers/ApiRoute'

const Register = () => {
    const navigate = useNavigate();
    const [userRegisterData, setUserRegisterData] = useState({
        username:'',
        password:'',
        email: '',
        user_type:''
    });

    const userRegisterChange = (e) => {
        const { name, value } = e.target;
        setUserRegisterData((prevData) => ({
          ...prevData,
          [name]: value,
          user_type: 1
        }));
      };

      const userRegisterSubmit = async (e) => {
        e.preventDefault();
        await axios.post(API_ROUTE + 'users', userRegisterData, {headers: {
            'Content-Type': 'application/json',
        }})
        setUserRegisterData({
            username:'',
            password:'',
            email: '',
            user_type:''
        })
        navigate("/login");
      };
    
    

    return(
        <div className="container">
            <div className="h1 text-center" id='register-margin'>Sign<span className='ms-2' id="register-header-color" >UP</span></div>
            <form className='mb-3' onSubmit={(e) => userRegisterSubmit(e)}>
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faUser} id='icons-register'/> <label htmlFor="name" className="form-label">Your Name:</label>
                    <input type="string" className="form-control" id="name" aria-describedby="emailHelp" placeholder='Enter your name' name='username'
                    onChange={(e) => {
                        userRegisterChange(e);
                      }}
      />
                </div>
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faEnvelope} id='icons-register'/> <label htmlFor="email" className="form-label">Your Email:</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Enter your email' name='email'
                    onChange={(e) => {
                        userRegisterChange(e);
                      }}/>
                </div>
                {/*<div className="mb-3 px-5">
                <FontAwesomeIcon icon={faPhone} id='icons-register'/><label htmlFor="exampleInputPassword1" className="form-label">Your Phone Number:</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your phone' />
                </div>*/}
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faLock} id='icons-register'/> <label htmlFor="password" className="form-label">Choose your Password:</label>
                    <input type="password" className="form-control" id="password" aria-describedby="emailHelp" placeholder='Enter your password' name='password'
                    onChange={(e) => {
                        userRegisterChange(e);
                      }}/>
                </div>
                {/*<div className="mb-3 px-5">
                <FontAwesomeIcon icon={faLock} id='icons-register'/> <label htmlFor="exampleInputEmail1" className="form-label">Repeat your Password:</label>
                    <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Repeat your password'/>
                </div>*/}
                <div className="d-flex flex-row justify-content-center">
                    <button type="submit" className="btn" id='register-button'>
                        <span className='pe-1'>Create account</span><FontAwesomeIcon icon={faUserPlus}/>
                    </button>
                </div>

                
            </form>
        </div>
    )
}

export default Register;