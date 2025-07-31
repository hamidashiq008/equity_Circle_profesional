import React, { useState } from 'react'
import axios from 'axios'
import LogoImg from '../../assets/images/logo.png';
import GoogleImg from '../../assets/images/google.png';
import FacebookImg from '../../assets/images/facebook1.png';
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const loginApiUrl = "https://equity-api.techtrack.online/api/login";
    const [errorMsg, setErrorMsg] = useState();
    const navigate = useNavigate();


    const [userData, setUserData] = useState(
        {
            name: '',
            email: '',
            password: '',
            password_conformation: ''
        }
    );

    const userValues = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    console.log(userData)

    const LoginSubmit = async (e) => {

        e.preventDefault();

        const userFormData = new FormData();
        userFormData.append('email', userData.email);
        userFormData.append('password', userData.password);

        try {
            const loginApi = await axios.post(loginApiUrl, userFormData);
            setErrorMsg('Successful');
        } catch (error) {
            const firstKey = Object.keys(error.response.data.errors)[0];
            const firstErrorMessage = error.response.data.errors[firstKey][0];

            setErrorMsg(firstErrorMessage);

        }
    }
    const changePage = () => {
        navigate('/')
    }
    return (
        <>
            <div className='login-page vh-100 d-flex align-items-center'>

                <div className="login-form d-flex gap-3 flex-column align-items-center w-100">
                    <div className="logo-wrapper d-flex gap-3 align-items-center justify-content-center">
                        <div className="logo-img">
                            <img src={LogoImg} alt="" />
                        </div>
                        <div className="logo-name">
                            Equity Circle
                        </div>
                    </div>
                    <div className="form-inner-wrapper w-100">
                        <form onSubmit={LoginSubmit} className='form-main-wrapper d-flex flex-column'>

                            <div className='d-flex flex-column gap-2'>
                                <label htmlFor="">Email</label>
                                <input type="email" placeholder='Enter your Email' name='email' onChange={userValues} />
                            </div>
                            <div className='d-flex flex-column gap-2'>
                                <label htmlFor="">Password</label>
                                <input type="password" placeholder='Enter your Password' name='password' onChange={userValues} />
                            </div>
                            <div className='remember-forgot-password d-flex align-items-center justify-content-between'>
                                <div className="remember-me-wrapper d-flex align-items-center gap-2">
                                    <input type="checkbox" id='remember' />
                                    <label for="remember">Conform Password</label>
                                </div>
                                <div className="forgot-password">forgot password</div>
                            </div>
                            {errorMsg}
                            <button type='submit' className='sign-up-btn'>Login</button>
                        </form>
                        <div className="or-suggestion-head my-2 d-flex align-items-center ">
                            <hr className='flex-grow-1' />
                            <div className="or-text my-1 mx-3">
                                or
                            </div>
                            <hr className='flex-grow-1' />
                        </div>
                        <div className="social-links d-flex align-items-center gap-2">
                            <div className="d-flex align-items-center justify-content-center gap-2 logo-wrapper">
                                <div className="logo-icon">
                                    <img src={GoogleImg} alt="" />
                                </div>
                                <div className="logo-name">
                                    Google
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center gap-2 logo-wrapper">
                                <div className="logo-icon">
                                    <img src={FacebookImg} alt="" />
                                </div>
                                <div className="logo-name">
                                    Facebook
                                </div>
                            </div>
                        </div>
                        <div className="login-page-link d-flex align-items-cetner justify-content-center gap-1 mt-4">
                            <p className='m-0'>Already Have An Account ?</p>
                            <button className='p-0' onClick={changePage}>Sign up</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LoginPage
