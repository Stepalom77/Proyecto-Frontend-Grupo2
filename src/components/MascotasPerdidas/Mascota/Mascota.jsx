import React, { useEffect, useState, useContext } from 'react';
import './Mascota.css';
import { MyContext } from '../../../context/MyProvider';
import { API_ROUTE } from '../../../helpers/ApiRoute';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Mascota = ({petId}) => {
    // const { petId } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null); 
    const { currentUser, isLogin } = useContext(MyContext);

    useEffect(() => {
        const token = 'Bearer TokenImplicitoParaLaAplicacionWeb';
        const headers = {
            Authorization: token,
        };

        const fetchPet = async () => {
            // try {
            //     const response = await fetch(API_ROUTE + `pets/${petId}`, { headers });
            //     const data = await response.json();
            //     const petData = data;
            //     setPet(petData); 
            // } catch (error) {
            //     console.error('Error fetching pet', error);
            // }
            axios.get(API_ROUTE + `pets/${petId}`, { headers })
            .then((response) => {
                const petData = response.data;
                setPet(petData);
            })
            .catch((error) => {
                console.error('Error fetching pet', error);
            });
        };
        
        fetchPet();

    }, [petId]);

    if (!pet) {
        return <div>Cargando...</div>;
    }


    return (
        <div className="">
            <main className="row justify-content-around">
                <div className="container-fluid">
                    <div className="row justify-content-around">
                        <div className="row justify-content-around bounce-in-bottom" id="cardDisplayer">
                            <article className="card col-md-10 col-lg-5 col-xl-4">
                                        {/* {pet.photos[0]?.url && <img src={pet.photos[0]?.url} className="card-img-top" alt={pet.name} />} */}
                                        <div className="card-body">
                                            <h5 className="card-title">{pet.name}</h5>
                                            <p className="card-text special"><span className="special" >Type: </span>{pet.type}</p>
                                            <p className="card-text special"><span className="special" >Breed: </span>{pet.breed}</p>
                                            <p className="card-text special"><span className="special" >Age: </span>{pet.age}</p>
                                            {isLogin && <p className="card-text special"><span className="special" >Owner: </span>{pet.owner.username}</p>}
                                            {isLogin && <p className="card-text contact"><span className="material-symbols-outlined" >call</span> {pet.owner.mobile_number} </p>}
                                            {isLogin && <p className="card-text contact"><span className="material-symbols-outlined" >mail</span> {pet.owner.email} </p>}
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
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

};

export default Mascota;