import React, { useState, useEffect } from 'react';
import './MascotaEdit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTE } from '../../../helpers/ApiRoute';

const MascotaEdit = () => {
    const { petId } = useParams();
    const [pet, setPet] = useState(null);
    const [petTypes, setPetTypes] = useState([]);
    const [breads, setBreeds] = useState([]);
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [status, setStatus] = useState(null);
    const [alert, setAlert] = useState('');
    const [jwt, setJwt] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [petData, setPetData] = useState({
        name: '',
        owner_user: '',
        pet_type: 0,
        breed_id: 0,
        pet_status: 0,
        age: 0
    });

    useEffect(() => {
        setJwt(localStorage.getItem('token')); 
    }, []);

    useEffect(() => {
        if(jwt && petId) {
            const getPetTypes = async() => {
                const userData = await axios.get(API_ROUTE + 'util/pettype', {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }});
                setPetTypes(userData.data);
            }
            getPetTypes();

            const getPet = async() => {
                const petData = await axios.get(API_ROUTE + `pets/${petId}`, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }});
                setPet(petData.data[0]);
            }
            getPet();
        }

    }, [jwt, petId]);

    useEffect(() => {
        if(pet) {
            console.log('pet', pet);
            setPetData({
                age: pet.age,
                breed_id: pet.breed_id,
                name: pet.name,
                owner_user: pet.owner.username,
                pet_status: pet.status_id,
                pet_type: pet.pet_type
            });
            setType(pet.pet_type);
            setBreed(pet.breed_id);
            setStatus(pet.status_id);
        }
    }, [pet]);

    /*useEffect(() => {
        if(currentUserName) {
            setPetData(prevData => ({
                ...prevData,
                owner_user: currentUserName
              }));
        }
    }, [currentUserName]);*/

    useEffect(() => {
        if(type && jwt) {
            const getPetBreads = async() => {
                const breadsData = await axios.get(API_ROUTE + `util/petbreed/${type}`, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }});
                setBreeds(breadsData.data);
            }
            getPetBreads();
            setPetData(prevData => ({
                ...prevData,
                pet_type: parseInt(type) 
              }));
        }
    }, [type, jwt]);

    useEffect(() => {
        if(breed) {
            setPetData(prevData => ({
                ...prevData,
                breed_id:  parseInt(breed) 
              }));
        }
    }, [breed])

    useEffect(() => {
        if(status) {
            setPetData(prevData => ({
                ...prevData,
                pet_status:  parseInt(status) 
              }));
        }
    }, [status]);

    const onPhotoChange = (e) => {
        setPhoto(e.target.files[0])
    }

    const editPetChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'age' ? Number(value) : value;
        setPetData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));
      };
    
      const editPetSubmit = async (e) => {
        e.preventDefault();
        setPetData((prevData) => ({
            ...prevData,
            age: parseInt(petData.age) ,
          }));
        console.log(petData);
        try {
            const editPet = await axios.patch(API_ROUTE + `pets/${petId}`, petData, {
              headers: {
                'Authorization': `Bearer ${jwt}`,
              },
            });
            console.log(editPet);
            // If the request is successful
            setAlert('Pet successfully edited!');
          } catch (error) {
            // If the request fails
            setAlert(`Failed to edit pet`);
          }
      };

    return (
        <div className="container">
            <div className="h1 text-center" id='register-margin'>Pet<span className='ms-2' id="register-header-color" >DATA</span></div>
            {alert && <div className="alert alert-info mt-3">{alert}</div>}
            <form className='mb-3' onSubmit={(e) => editPetSubmit(e)}>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label for="pet-name" className="form-label">Pet Name:</label>
                    <input type="text" className="form-control" id="pet-name" name='name' value={petData.name ? petData.name : ''}  onChange={(e) => editPetChange(e)} />
                </div>

                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label htmlFor="pet-status" className="form-label">Type:</label>
                    <select className="form-control" id="pet-type" onChange={(e) => setType(e.target.value)} 
                    value={type ? type.type_id : ''}>
                        <option value="" disabled={!!type}>
                            {type ? type.type_name : 'Which is your type of pet?'}
                        </option>
                        {petTypes.map((petType) => (
                            <option key={petType.type_id} value={petType.type_id}>
                                {petType.type_name}
                            </option>
                        ))}
                    </select>
                </div>

                {breads.length > 0 &&  <div class="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/>
                    <label htmlfor="pet-breed" className="form-label">Breed:</label>
                    <select className="form-control" id="pet-breed" onChange={(e) => setBreed(e.target.value)} 
                    value={breed ? breed.breed_id : ''}>
                        <option value="" disabled={!!breed}>
                            {breed ? breed.breed_name : 'Which is the bread of your pet?'}
                        </option>
                        {breads.map((breedType) => (
                            <option key={breedType.breed_id} value={breedType.breed_id}>
                                {breedType.breed_name}
                            </option>
                        ))}
                    </select>
                </div>}
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label for="pet_age" className="form-label">Age:</label>
                    <input type="number" className="form-control" id="pet_age" value={petData.age !== undefined ? petData.age : ''} name='age' onChange={(e) => editPetChange(e)}/>
                </div>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label htmlFor="pet-status" className="form-label">Status:</label>
                    <select className="form-control" id="pet-status" onChange={(e) => setStatus(e.target.value)}
                    value={status ? status : ''}>
                    <option value="" disabled={!!status}>
                            {status ? status : 'Is your pet safe or lost?'}
                        </option>
                        <option value="1">Safe</option>
                        <option value="2">Lost</option>
                    </select>
                </div>

                <div className="d-flex flex-row justify-content-center">
                    <button type="submit" className="btn" id="register-button">
                        <span className="pe-1">Edit pet</span>
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
        </div>
    );
};

export default MascotaEdit;