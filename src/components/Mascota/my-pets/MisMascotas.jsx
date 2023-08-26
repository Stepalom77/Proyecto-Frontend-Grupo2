import React, { useEffect, useState } from 'react';
import './MisMascotas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Pets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Simulate API call with the provided token
        const token = 'Bearer TokenImplicitoParaLaAplicacionWeb';
        const headers = {
            Authorization: token,
        };

        const fakeAPICall = async () => {
            try {
                const response = await fetch('http://localhost:8000/pets/user/testfreeuser', { headers });
                const data = await response.json();
                setPets(data);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

        fakeAPICall();
    }, []);

    return (
        <div className="container">
            <div className="h1 text-center" id="register-margin">
                Pets<span className="ms-2 pet-header-color">Andrés</span>
            </div>
            <p className="h5 text-center">
                You have <span className="ms-2 pet-header-color">{pets.length}</span> pets
            </p>

            <div className="text-center m-3">
                <NavLink className="btn border border-0" id="navbar-button" to="/pet">
                    <button type="submit" className="btn" id="edit-button">
                        <span className="pe-1">Add</span>
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                </NavLink>

                <table className="table mb-5">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets.map((pet) => (
                            <tr key={pet.pet_id}>
                                <th scope="row" className="">
                                    {pet.name}
                                </th>
                                <td>
                                    <span className={`ms-2 ${pet.status_id === 1 ? 'pet-found' : 'pet-lost'}`}>
                                        {pet.status}
                                    </span>
                                </td>
                                
                                

                                <td>
                                    <button type="submit" className="btn btn-sm btn-danger">
                                        <span className="pe-1">Delete</span>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pets;


/**
 columna para editar
<td>
    <button type="submit" className="btn btn-sm" id="edit-button">
        <span className="pe-1">Edit</span>
        <FontAwesomeIcon icon={faPencil} />
    </button>
</td>
 */