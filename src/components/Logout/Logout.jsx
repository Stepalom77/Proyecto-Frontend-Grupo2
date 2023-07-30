import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate("/login");
    }

    const navigateLostPets = () => {
        navigate("/lost-pets");
    }
    return(
        <div className="container">
            <div className="h1 text-center" id='login-margin-top'><span id="login-header">You'll be missed!</span></div>
            <div className="h5 text-center" id='login-margin-top'> Thank you for using <span id="login-header">MaPet</span>. We hope to see you soon!</div>
            <div className="d-flex flex-row justify-content-center mb-5">
                <button type="button" className="btn me-4" id="pets-button" onClick={navigateLostPets}> Have you seen any lost pet?</button>
                <button type="button" className="btn" id="login-button" onClick={navigateLogin}>Do you want to login again?</button>
            </div>
        </div>
    )
}
export default Logout;