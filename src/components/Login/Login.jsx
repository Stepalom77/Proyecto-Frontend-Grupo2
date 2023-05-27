import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import './Login.css'
const Login = () => {
    return(
        <div className="container">
            <div className="h1 text-center" id='login-margin-top'>Log <span id="login-header">IN</span></div>
            <form className='mb-3'>
                <div className="mb-3 px-5">
                <FontAwesomeIcon icon={faEnvelope} id='icons-login'/> <label for="exampleInputEmail1" className="form-label ms-1">Your Email:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email'/>
                </div>
                <div class="mb-3 px-5">
                <FontAwesomeIcon icon={faLock} id='icons-login'/><label for="exampleInputPassword1" className="form-label">Enter your password:</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password'/>
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