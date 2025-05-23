import React, { useState } from 'react';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import { FaEye } from 'react-icons/fa';
import { FaEyeLowVision } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import auth from '../../Firebase/Firebase.init';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const Registration = () => {
    const [showpas,setshowpas] = useState(false)
    const navigate = useNavigate();


    const validatePassword = (password) => {
        const upperCaseCheck = /[A-Z]/.test(password); // Uppercase Letter Check
        const lowerCaseCheck = /[a-z]/.test(password); // Lowercase Letter Check
        const lengthCheck = password.length >= 6; // Minimum Length Check
    
        if (!upperCaseCheck) {
            toast.error("Must have an Uppercase leer in the password");
            return false;
        }
        if (!lowerCaseCheck) {
            toast.error("Must have a Lowercase leer in the password");
            return false;
        }
        if (!lengthCheck) {
            toast.error("Length must be at least 6 character");
            return false;
        }
        return true;
        };
    
    const handelRegister = (event) => {
        
        event.preventDefault();
        
        const name = event.target.name.value;
        const email = event.target.email.value;
        const photoURL = event.target.PhotoURL.value;
        const password = event.target.password.value;

        if (!validatePassword(password)) {
            return;
        }
        const UserData = {name, email, photoURL, password}
        console.log(UserData);

        // Creating a user with Firebase Authentication
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log('User Created:', result.user);
                toast('Registration is successful')
                navigate('/');
                // add login data in to 
                const sendToDataBase = async() => {
                    const response = await fetch('https://chill-gamer-server-jzl0.onrender.com/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(UserData)
                    });
                    const data = await response.json();
                    console.log(`send data to mongodb ${data}`);
                }
                sendToDataBase();
                // Updating user's profile with name and photoURL
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoURL,
                })
                    .then(() => {
                        console.log('Profile updated successfully');
                    })
                    .catch((error) => {
                        console.error('Error updating profile:', error.message);
                        toast('something is wrang')
                    });
            } )
            .catch((error) => {
                console.error('Error creating user:', error.message);
            });
    };

    return (
        <div>
            <div>
                <Navbar/>
                <div>
                <div>
                <h2 className="text-4xl font-bold text-center mb-2 mt-11">Registration/Signup</h2>
                <div>
                    <div className="hero bg-cyan-200 min-h-screen">
                        <div className="hero-content flex-col lg:flex-row-reverse">
                            <div className="text-center lg:text-left">
                                <DotLottieReact
                                    src="https://lottie.host/f107d7b7-2e9a-463e-9698-8b965b72238f/mPsFMFWlBi.lottie"
                                    loop
                                    autoplay
                                    className='w-[300px]  md:w-[600px] lg:[900px] '
                                />
                                <p className="py-6 text-center">
                                    registration for login our website
                                </p>
                            </div>
                            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                                <form onSubmit={handelRegister} className="card-body">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="email"
                                            name="email"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Photo-URL</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Photo-URL"
                                            name="PhotoURL"
                                            className="input input-bordered"
                                            required
                                        />
                                    </div>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            type={showpas ? 'text' : 'password' } 
                                            placeholder="password"
                                            name="password"
                                            className="input input-bordered"
                                            required
                                        />
                                        <button 
                                        onClick={() => setshowpas(!showpas)}
                                        type="button"
                                        className='btn btn-xs absolute right-4 top-12'>
                                        {
                                            showpas ? <FaEye ></FaEye> : <FaEyeLowVision ></FaEyeLowVision >
                                        }
                                        </button>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button type="submit" className="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                    <Link to="/Login">Or Login</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
                <Footer/>
            </div>
        </div>
    );
};

export default Registration;



