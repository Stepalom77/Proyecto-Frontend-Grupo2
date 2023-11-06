import React, { useEffect, useState, useContext } from 'react';
import './MascotasPerdidas.css';
import { MyContext } from '../../context/MyProvider';
import { API_ROUTE } from '../../helpers/ApiRoute';
import { useNavigate } from "react-router-dom";

const MascotasPerdidas = () => {
    const navigate = useNavigate();
    const [lostPets, setLostPets] = useState([]);
    const { currentUser, isLogin } = useContext(MyContext);

    useEffect(() => {
        const token = 'Bearer TokenImplicitoParaLaAplicacionWeb';
        const headers = {
            Authorization: token,
        };

        const fetchLostPets = async () => {
            try {
                const response = await fetch( API_ROUTE + 'pets/status/2', { headers });
                const data = await response.json();
                const lostPetsData = data;
                setLostPets(lostPetsData);
            } catch (error) {
                console.error('Error fetching lost pets:', error);
            }
        };

        fetchLostPets();
    }, []);

    const toPet = (petId) => {
        navigate(`/pet/${petId}`)
    }
    return(
        <div className="">
            {/* Banner */}
            <div className="banner-container has-image mask-b">
                    <div className="banner-img-wrap">
                        <figure className="banner-mask">
                            <img className="mask-b" src="/assets/img/news.png" alt="news"/>
                        </figure>
                    </div>
                <div className="banner-header">
                    <div className="heading">
                        <h1 className="reader-text">Lost pets</h1>
                        <h2 className="h2--small">Have you seen them?</h2>
                        <p className="h1">We want you to get back together soon!</p>
                    </div>
                </div>
                <div className="blob--yellow left"></div>
                <div className="blob--green right"></div>
            </div>

            {/* Main */}
            <main class="row justify-content-around">
                <div class="container-fluid">
                    <div class="row justify-content-around">
                        <section class="showcase sm-col-12 lg-col-6 bg-aqua" >
                            <h3 class="showcase-title">Have you seen <span class="stand-out">me?</span></h3>
                            <div class="row justify-content-around bounce-in-bottom" id="cardDisplayer">
                                {/* Ejemplo */}
                                {lostPets.map(pet => (
                                    <article class="card col-md-10 col-lg-5 col-xl-4"  key={pet.pet_id} onClick={() => toPet(pet.pet_id)}>
                                            
                                        {/*<a className="pet-name" style={{textDecoration: 'none !important', color: '#000A36 !important'}} href="/pet/123">
                                            <img src="https://media.discordapp.net/attachments/1063874117507494048/1072561078661300224/abuela_de_dos_floppy_eared_Beauceron_dog_happy_tongue_out_using_e4270418-f93d-403b-9487-07c1dfb275dd.png?width=1024&height=1024" class="card-img-top" alt="" />
                                        </a>*/}

                                        {pet.photos[0]?.url && <img src={pet.photos[0]?.url} class="card-img-top" alt={pet.name} />}
                                        
                                        <div className="card-body">
                                            <h5 className="card-title">{pet.name}</h5>
                                            <p className="card-text special fuente"><span className="special" >Type: </span>{pet.type}</p>
                                            <p className="card-text special fuente"><span className="special" >Breed: </span>{pet.breed}</p>
                                            <p className="card-text special fuente"><span className="special" >Age: </span>{pet.age}</p>
                                            {isLogin && <p className="card-text special fuente"><span className="special" >Owner: </span>{pet.owner.username}</p>}
                                            {isLogin && <p className="card-text contact fuente"><span className="material-symbols-outlined" >call</span> {pet.owner.mobile_number} </p>}
                                            {isLogin && <p className="card-text contact fuente"><span className="material-symbols-outlined" >mail</span> {pet.owner.email} </p>}
                                            <div className="btns-wrapper">
                                            {currentUser && (
                                                <button className="btn btn-mapet-primary" onClick={()=> (window.location.href = `mailto:${pet.owner.email}`) }>Contact owner <span className="material-symbols-outlined">pets</span></button>
                                            )}
                                            { !isLogin && <div class="btns-wrapper">
                                                <button className="btn btn-secondary" onClick={() => navigate('/login')}>Contact owner <span className="material-symbols-outlined">pets</span></button>
                                            </div>
                                            }                                            
                                            </div>
                                            {!isLogin && <p className="card-text contact" style={{gap: 0.3 + 'rem'}}><a className="text-success" href="/login"><span className="material-symbols-outlined" >login</span>Log in </a>  to see owner's contact information</p>}
                                            
                                        </div>
                                    </article>
                                     ))}
                                {/* Fin ejemplo */}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default MascotasPerdidas;