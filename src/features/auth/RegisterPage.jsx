import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/slices/auth/registerSlice';
import LogoImg from '../../assets/images/logo.png';
// import Header from '../../components/Header';
import { Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

const RegisterPage = () => {

  const dispatch = useDispatch();
  
  const { isLoading, error, successMessage } = useSelector((state) => state.register);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConformation: '',
  });

  const getValue = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  return (
    <>
      {/* <Header /> */}
      <div className="register-page">
        <div className="logo-wrapper">
          <div className="logo-img">
            <img src={LogoImg} alt="" />
          </div>
          <div className="logo-name fs-46 fw-800">Equity Circle</div>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input type="text" required placeholder='Enter Your Name' name='name' onChange={getValue} />
          <label>Email</label>
          <input type="email" required placeholder='Enter Your Email' name='email' onChange={getValue} />
          <label>Password</label>
          <input type="password" required placeholder='Enter Your Password' name='password' onChange={getValue} />
          <label>Confirm Password</label>
          <input type="password" required placeholder='Enter Your Confirm Password' name='passwordConformation' onChange={getValue} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Nav.Link as={NavLink} className='fs-40 text-light mt' to="/LoginPage">
          LoginPage
        </Nav.Link>
      </div>
    </>
  );
};

export default RegisterPage;
