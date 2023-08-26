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

    return (
        <div className="container p-4 ">
            <p className="text-center tit">HAVE YOU SEEN THEM</p>
            <p className="text-center mb-4">We want you to get back together soon!</p>

            {lostPets.map(pet => (
                <div className='lost container-fluid text-center pb-3' key={pet.pet_id}>
                    <h1 className="text-center bluepet">ARE ANY OF THESE <span className='tit'>YOURS?</span></h1>

                    {pet.photos[0]?.url && <img src={pet.photos[0]?.url} className="img-fluid" alt={pet.name} />}

                    <h2 className="text-center bluepet mt-3">{pet.name}</h2>

                    <table className="table mt-4 mb-3">
                        <tbody>
                            <tr>
                                <td>{pet.type}</td>
                                <td><span className='tit'>BREED:</span> {pet.breed}</td>
                            </tr>
                            <tr>
                                <td><span className='tit'>AGE:</span> {pet.age} months</td>
                                <td><span className='tit'>WEIGHT:</span> {pet.weight} Kg</td>
                            </tr>
                        </tbody>
                    </table>
                    <p><span className='tit'>OWNER:</span> {pet.owner}</p>

                    <NavLink className="btn border border-0" id='navbar-button' to="/pet">
                        <button type="submit" className="btn btn-secondary mb-3">
                            <span className='pe-1'>Contact owner</span><FontAwesomeIcon icon={faPaw}/>
                        </button>
                    </NavLink>

                    <p className="text-center mb-3">
                        <NavLink className="btn border border-0" id='navbar-button' to="/login">
                            <span className="tit">Log in</span>
                        </NavLink> 
                        to see owner's contact information
                    </p>
                </div>
            ))}
        </div>
    );
};

export default MascotasPerdidas;
