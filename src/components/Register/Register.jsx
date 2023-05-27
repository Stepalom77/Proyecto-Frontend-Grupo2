import './Register.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser, faUserPlus, faPhone } from '@fortawesome/free-solid-svg-icons'
const Register = () => {
    return(
        <div className="container">
            <div className="h1 text-center" id='register-margin'>Sign<span className='ms-2' id="register-header-color" >UP</span></div>
            <form className='mb-3'>
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faUser} id='icons-register'/> <label for="exampleInputEmail1" className="form-label">Your Name:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your name'/>
                </div>
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faEnvelope} id='icons-register'/> <label for="exampleInputEmail1" className="form-label">Your Email:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email'/>
                </div>
                <div class="mb-3 px-5">
                <FontAwesomeIcon icon={faPhone} id='icons-register'/><label for="exampleInputPassword1" className="form-label">Your Phone Number:</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your phone'/>
                </div>
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faLock} id='icons-register'/> <label for="exampleInputEmail1" className="form-label">Choose your Password:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your password'/>
                </div>
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faLock} id='icons-register'/> <label for="exampleInputEmail1" className="form-label">Repeat your Password:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Repeat your name'/>
                </div>
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