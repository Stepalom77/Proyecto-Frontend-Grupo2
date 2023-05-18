import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return(
        <footer className='border border-0' id="footer">
            <div className="container text-center text-lg-start" id='empty-footer'></div>
            <div className="container text-center text-lg-start mt-5 d-flex flex-row justify-content-between" id='custom-border'>
                <div className='mt-4'>
                    <FontAwesomeIcon icon={faCopyright} id='icon'/>
                    <span id='footer-text'>MAPet</span>
                    <span className='text-white'>, All Right Reserved.</span>
                </div>
                <div className='mt-4 d-flex flex-row justify-content-between'>
                    <p className='mx-2' id='footer-text'>Terms of use</p>
                    <p className='mx-2' id='footer-text'> Help</p>
                    <p className='mx-2' id='footer-text'>FAQs</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer