import React, { useState } from 'react';
import './MascotasRegisterEdit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const MascotasRegister = () => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [status, setStatus] = useState('');
    const [alert, setAlert] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const token = 'Bearer TokenImplicitoParaLaAplicacionWeb';
        const headers = {
            Authorization: token,
            'Content-Type': 'application/json',
        };

        const data = {
            name: document.getElementById('pet-name').value,
            owner_user: document.getElementById('pet-owner').value,
            pet_type: parseInt(document.getElementById('pet-type').value),
            breed_id: parseInt(document.getElementById('pet-breed').value),
            status_id: parseInt(document.getElementById('pet-status').value),
        };

        console.log(data)

        try {
            const response = await fetch('http://localhost:8000/pets', {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setAlert('Pet created successfully!');
                // Reset the form fields after successful creation
                setName('');
                setOwner('');
                setType('');
                setBreed('');
            } else {
                setAlert('Failed to create pet.');
            }
        } catch (error) {
            console.error('Error creating pet:', error);
            setAlert('An error occurred while creating the pet.');
        }
    };

    return (
        <div className="container">
            <div className="h1 text-center" id='register-margin'>Pet<span className='ms-2' id="register-header-color" >DATA</span></div>
            <form className='mb-3'>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label for="pet-name" className="form-label">Pet Name:</label>
                    <input type="text" className="form-control" id="pet-name" placeholder='Enter pet name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label htmlFor="pet-status" className="form-label">Status:</label>
                    <select className="form-control" id="pet-type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="1">Dog</option>
                    </select>
                </div>

                <div class="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/>
                    <label for="pet-breed" className="form-label">Breed:</label>
                    <input type="text" className="form-control" id="pet-breed" placeholder='Enter breed' value="22" onChange={(e) => setBreed(e.target.value)} />
                </div>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label for="" className="form-label">Age:</label>
                    <input type="text" className="form-control" id="" placeholder='Enter pet age' />
                </div>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label for="" className="form-label">Weight:</label>
                    <input type="text" className="form-control" id="" placeholder='Enter pet weight' />
                </div>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label htmlFor="pet-status" className="form-label">Status:</label>
                    <select className="form-control" id="pet-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="1">A salvo</option>
                        <option value="2">Perdida</option>
                    </select>
                </div>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label for="pet-owner" className="form-label">Owner:</label>
                    <input type="text" className="form-control" id="pet-owner" placeholder='Enter owner' value="testfreeuser" onChange={(e) => setOwner(e.target.value)} />
                </div>

                <div className="d-flex flex-row justify-content-center">
                    <button type="submit" className="btn" id="register-button" onClick={handleSubmit}>
                        <span className="pe-1">Create pet</span>
                        <FontAwesomeIcon icon={faPaw} />
                    </button>
                </div>
                <br />
                <div className="d-flex flex-row justify-content-center">
                    <NavLink className="btn border border-0" id='navbar-button' to="/my-pets" activeclassname="active">
                        <button type="button" className="btn btn-secondary" id="view-pets-button">
                            View My Pets
                        </button>
                    </NavLink>
                </div>
            </form>

            {alert && <div className="alert alert-info mt-3">{alert}</div>}
        </div>
    );
};

export default MascotasRegister;