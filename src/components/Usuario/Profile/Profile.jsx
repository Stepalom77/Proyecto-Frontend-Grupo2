import React, { useEffect, useState, useContext } from 'react';
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MyContext } from '../../../context/MyProvider';
import axios from 'axios'
import { API_ROUTE } from '../../../helpers/ApiRoute';
import { faEnvelope, faCircleUser, faPhone, faPencil } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
    const { currentUserName, setCurrentUser, setCurrentUserName} = useContext(MyContext);
    const [user, setUser] = useState(null);
    const [userEditData, setUserEditData] = useState({
        username: '',
        email: '',
        mobile_number: ''
    });
    const [jwt, setJwt] = useState(null);
    const [alert, setAlert] = useState('');

    useEffect(() => {
        setJwt(localStorage.getItem('token')); 
    }, []);

    useEffect(() => {
        if(jwt && currentUserName) {
            const getUser = async() => {
                const userData = await axios.get(API_ROUTE + 'users/' + currentUserName, {headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                }});
                setUser(userData.data);
            }
            getUser();
        }
    }, [jwt, currentUserName]);

    useEffect(() => {
        if(user) {
            setUserEditData({
                email: user.email,
                mobile_number: user.mobile_number,
                username: user.username
            })
        }
    }, [user]);

    const userEditChange = (e) => {
        const { name, value } = e.target;
        setUserEditData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const userEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await axios.patch(API_ROUTE + 'users', userEditData,  {headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }});
            setCurrentUser(userData.data.email);
            setCurrentUserName(userData.data.username);
            setAlert('Data successfully created!');
        } catch (error) {
            // If the request fails
            setAlert(`Failed to update data`);
          }
      };


    return(
        <section className="container">
            <h2 className="pb-4 text-center"><span className='me-1 pet-header-color'>{currentUserName}</span><span>Profile Information</span></h2>
            {alert && <div className="alert alert-info mt-3">{alert}</div>}
            <form className='mb-3' onSubmit={(e) => userEditSubmit(e)}>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faCircleUser} id='icons-login'/><label htmlFor="username" className="form-label">Your Name:</label>
                        <input type="text" className="form-control" id="username" value={userEditData.username} name='username'
                        onChange={(e) => {
                            userEditChange(e);
                        }}/>
                </div>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faEnvelope} id='icons-login'/> <label htmlFor="emailLogin" className="form-label ms-1">Your Email:</label>
                        <input type="email" className="form-control" id="emailLogin" aria-describedby="emailHelp" value={userEditData.email} name='email'
                        onChange={(e) => {
                            userEditChange(e);
                        }}/>
                </div>
                <div className="mb-3 px-5">
                    <FontAwesomeIcon icon={faPhone} id='icons-login'/><label htmlFor="mobileNumber" className="form-label">Enter Phone Number:</label>
                        <input type="text" className="form-control" id="mobileNumber" value={userEditData.mobile_number ? userEditData.mobile_number : ''} name='mobile_number'
                        onChange={(e) => {
                            userEditChange(e);
                        }}/>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <button type="submit" className="btn d-flex justify-content-around button-edit">
                        <span className='pe-2'>Edit Profile</span><FontAwesomeIcon icon={faPencil}/>
                    </button>
                </div>

                
                    </form>
        </section>
    )
}

export default Profile;