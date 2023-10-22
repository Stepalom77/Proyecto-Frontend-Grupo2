import React, { useEffect, useState, useContext } from 'react';
import './MisMascotas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { MyContext } from '../../../context/MyProvider';
import AlertMessage from './AlertMessage'; // Importa el componente de alerta
import { API_ROUTE } from '../../../helpers/ApiRoute';

const MisMascotas = () => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false); // Estado para mostrar la alerta
    const { currentUser, currentUserName } = useContext(MyContext);
    const [alertMessage, setAlertMessage] = useState(''); // Mensaje de la alerta

    useEffect(() => {
        // Simulate API call with the provided token
        const token = 'Bearer TokenImplicitoParaLaAplicacionWeb';
        const headers = {
            Authorization: token,
        };

        const fakeAPICall = async () => {
            try {
                const response = await fetch(API_ROUTE + `pets/user/${currentUserName}`, { headers });
                const data = await response.json();
                setPets(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching pets:', error);
                setIsLoading(false);
            }
        };

        fakeAPICall();
    }, []);

    const handleDeletePet = async (idPet) => {
        const token = 'Bearer TokenImplicitoParaLaAplicacionWeb';
        const headers = {
            Authorization: token,
        };

        try {
            await fetch(API_ROUTE + `pets/${idPet}`, {
                method: 'DELETE',
                headers,
            });

            // Después de eliminar la mascota, actualizamos la lista de mascotas
            const updatedPets = pets.filter((pet) => pet.pet_id !== idPet);
            setPets(updatedPets);

            // Mostrar la alerta de éxito
            setShowAlert(true);
            setAlertMessage('Mascota eliminada correctamente');

            // Cerrar la alerta después de unos segundos (opcional)
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } catch (error) {
            console.error('Error deleting pet:', error);
        }
    };

    return (
        <div className="container">
            <div className="h1 text-center" id="register-margin">
                Pets<span className="ms-2 pet-header-color">{currentUserName}</span>
            </div>
            <p className="h5 text-center">
                {isLoading ? (
                    <h4>Loading...</h4>
                ) : (
                    `You have ${pets.length} pets`
                )}
            </p>

            <div className="text-center">
                <NavLink className="btn btn-sm" to="/pet">
                    <button type="submit" className="btn" id="edit-button">
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </button>
                    <p>Agregar mascota</p>
                </NavLink>

                {showAlert && <AlertMessage message={alertMessage} onClose={() => setShowAlert(false)} />}

                {isLoading ? (
                    ""
                ) : (
                    pets.length > 0 && (
                        <div> 
                            <table className="table mx-auto" style={{ width: 'auto' }}>
                                <thead>
                                    <tr>
                                        <th className="text-left-header">Pet</th>
                                        <th className="text-left-header">Status / Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pets.map((pet) => (
                                        <tr key={pet.pet_id}>
                                            <th scope="row" className="text-left-header">
                                                {pet.name}
                                            </th>
                                            <td>
                                                <span className={`ms-2 ${pet.status_id === 1 ? 'pet-found' : 'pet-lost'}`}>
                                                    {pet.status}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm"
                                                    onClick={() => handleDeletePet(pet.pet_id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                                <NavLink to={`/pet/${pet.pet_id}`}>
                                                    <button type="submit" className="btn btn-sm">
                                                            <FontAwesomeIcon icon={faPencil} />
                                                    </button>
                                                </NavLink>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default MisMascotas;
