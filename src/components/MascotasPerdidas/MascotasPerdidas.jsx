import React, { useEffect, useState } from 'react';
import './MascotasPerdidas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const MascotasPerdidas = () => {
    const [lostPets, setLostPets] = useState([]);

    useEffect(() => {
        const token = 'Bearer TokenImplicitoParaLaAplicacionWeb';
        const headers = {
            Authorization: token,
        };

        const fetchLostPets = async () => {
            try {
                const response = await fetch('http://localhost:8000/pets', { headers });
                const data = await response.json();
                const lostPetsData = data.filter(pet => pet.status_id === 2);
                setLostPets(lostPetsData);
            } catch (error) {
                console.error('Error fetching lost pets:', error);
            }
        };

        fetchLostPets();
    }, []);
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
                                    <article class="card col-md-10 col-lg-5 col-xl-4" key={pet.pet_id}>
                                            
                                        <a className="pet-name" style={{textDecoration: 'none !important', color: '#000A36 !important'}} href="/pet/123">
                                            <img src="https://media.discordapp.net/attachments/1063874117507494048/1072561078661300224/abuela_de_dos_floppy_eared_Beauceron_dog_happy_tongue_out_using_e4270418-f93d-403b-9487-07c1dfb275dd.png?width=1024&height=1024" class="card-img-top" alt="" />
                                        </a>

                                        {pet.photos[0]?.url && <a className="pet-name" style={{textDecoration: 'none !important', color: '#000A36 !important'}} href="/pet/123">
                                            <img src={pet.photos[0]?.url} class="card-img-top" alt={pet.name} />
                                        </a> }
                                        
                                        <div className="card-body">
                                            <h5 className="card-title"><a href="/pet/123">{pet.name}</a></h5>
                                            <p className="card-text special">{pet.type}</p>
                                            <p className="card-text special"><span className="special" >Breed: </span>{pet.breed}</p>
                                            <p className="card-text special"><span className="special" >Age: </span>{pet.age}</p>
                                            <p className="card-text special"><span className="special" >Weight: </span>{pet.weight}</p>
                                            <p className="card-text special owner"><span className="special owner" >Owner: </span>{pet.owner}</p>
                                            
                                            <p className="card-text contact"><span className="material-symbols-outlined" >call</span>+0123456789</p>
                                            <p className="card-text contact"><span className="material-symbols-outlined" >mail</span>test@mapet.com</p>
                                            <div className="btns-wrapper">
                                                <button className="btn btn-mapet-primary">Contact owner <span className="material-symbols-outlined">pets</span></button>
                                            </div>
                                            
                                            <div className="btns-wrapper">
                                                <button className="btn btn-secondary">Contact owner <span className="material-symbols-outlined">pets</span></button>
                                            </div>
                                            <p className="card-text contact" style={{gap: 0.3 + 'rem'}}><a className="text-success" href="/login"><span className="material-symbols-outlined" >login</span>Log in </a>  to see owner's contact information</p>
                                            
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