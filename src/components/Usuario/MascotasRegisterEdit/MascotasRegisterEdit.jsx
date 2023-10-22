import React, { useState, useEffect, useContext } from 'react';
import './MascotasRegisterEdit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { API_ROUTE } from '../../../helpers/ApiRoute';
import { MyContext } from '../../../context/MyProvider';

const MascotasRegister = () => {
    const { currentUserName } = useContext(MyContext);
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
        if(jwt) {
            const getPetTypes = async() => {
                const userData = await axios.get(API_ROUTE + 'util/pettype', {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }});
                setPetTypes(userData.data);
            }
            getPetTypes();
        }

    }, [jwt]);

    useEffect(() => {
        if(currentUserName) {
            setPetData(prevData => ({
                ...prevData,
                owner_user: currentUserName
              }));
        }
    }, [currentUserName]);

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

    const createPetChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'age' ? Number(value) : value;
        setPetData((prevData) => ({
          ...prevData,
          [name]: newValue,
        }));
      };
    
      const createPetSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if(photo) {
            formData.append('photos', photo);
        }
        setPetData((prevData) => ({
            ...prevData,
            age: parseInt(petData.age) ,
          }));
        formData.append('json', JSON.stringify(petData));
        console.log(petData);
        try {
            const createPet = await axios.post(API_ROUTE + 'pets', formData, {
              headers: {
                'Authorization': `Bearer ${jwt}`,
              },
            });
            // If the request is successful
            setAlert('Pet successfully created!');
            setPetData({
              name: '',
              owner_user: '',
              pet_type: 0,
              breed_id: 0,
              pet_status: 0,
              age: 0,
            });
          } catch (error) {
            // If the request fails
            setAlert(`Failed to create pet`);
          }
      };

    return (
        <div className="container">
            <div className="h1 text-center" id='register-margin'>Pet<span className='ms-2' id="register-header-color" >DATA</span></div>
            {alert && <div className="alert alert-info mt-3">{alert}</div>}
            <form className='mb-3' onSubmit={(e) => createPetSubmit(e)}>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/> 
                    <label for="pet-name" className="form-label">Pet Name:</label>
                    <input type="text" className="form-control" id="pet-name" placeholder='Your Pet Name' name='name'  onChange={(e) => createPetChange(e)} />
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
                    <input type="number" className="form-control" id="pet_age" placeholder='Enter pet age' name='age' onChange={(e) => createPetChange(e)}/>
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

                <div class="mb-3 px-5">
                    <FontAwesomeIcon icon={faPaw} id='icons-register'/>
                  <label htmlfor="Image" class="form-label">Photo:</label>
                  <input type="file" class="form-control" onChange={(e) => onPhotoChange(e)} id="Image"/>
                </div>

                <div className="d-flex flex-row justify-content-center">
                    <button type="submit" className="btn" id="register-button">
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
        </div>
    );
};

export default MascotasRegister;