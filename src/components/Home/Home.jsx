import './Home.css';
import React, { useContext } from 'react';
import { MyContext } from '../../context/MyProvider';
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {

    const { isLogin } = useContext(MyContext);
    const Navigate = useNavigate();

    const handleRegisterClick = () => {
        if (isLogin) {
      
            Navigate('/pet');
        } else {
      
            Navigate('/register');
        }
    };

    return(
        <div className="m-0 p-0">
            <div className="bg-navy position-relative p-0">
                <div className="py-5 hero-header mb-5">
                    <div className="my-5 py-5 px-lg-5">
                        <div className="row g-5 py-5">
                            <div className="col-lg-6 text-center text-lg-start">
                                <h1 className="text-white mb-4 animated zoomIn">Keep your furry friend safe and close with MAPet.</h1>
                                <p className="text-white pb-3 animated zoomIn">
                                    Register your pet and create a unique QR code that can be used to contact you if your pet is lost. Engrave badges, create velcro stripes, and declare your pet missing on our announcements page. Protect your furry friend with MAPet today!
                                    </p>
                                <button onClick={handleRegisterClick} className="btn btn-mapet py-sm-3 px-sm-5 rounded-pill me-3 animated slideInLeft">Register Your Pet Now</button>
                            </div>
                            <div className="col-lg-6 text-center text-lg-start">
                                <img className="img-fluid hero-img" src="/assets/img/rocco_hero.png" alt="Hero"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <main className="row justify-content-around">
                <div className="py-5">
                    <div className="px-lg-5">
                        <div className="row g-5">
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="section-title position-relative mb-4 pb-2">
                                    <h6 className="position-relative text-mapet ps-4">MAPet</h6>
                                    <h2 className="mt-2">Keep your pets safe and connected with MAPet.</h2>
                                </div>
                                <p className="mb-4">Losing a pet is every owner's worst nightmare. With MAPet, you can register your pet and generate a QR code with all their important information. If they ever go missing, simply declare them as lost and post it on our announcements page or share it on social media to increase visibility. Rest easy knowing that you have taken steps to ensure your furry friend's safe return home.
                                </p>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <h6 className="mb-3"><i className="material-symbols-outlined text-mapet me-2">check</i>
                                        Your contact information is safe
                                        </h6>
                                        <h6 className="mb-0"><i className="material-symbols-outlined text-mapet me-2">check</i>
                                        Customize your pet's accessories with the QR code
                                        </h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <h6 className="mb-3"><i className="material-symbols-outlined text-mapet me-2">check</i>
                                        Receive notifications when your pet's code is scanned
                                        </h6>
                                        <h6 className="mb-0"><i className="material-symbols-outlined text-mapet me-2">check</i>
                                        Help others to retrieve their pets
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 fadeInUp">
                                <img className="img-fluid wow zoomIn" data-wow-delay="0.5s" src="/assets/img/rocco_glasses.png" alt="Rocco"/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;