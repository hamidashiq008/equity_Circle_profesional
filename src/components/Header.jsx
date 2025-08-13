import React, { useState } from 'react'
import EquityNameLogo from '../assets/images/Equity-light.logo.png';
import BussinessSvg from '../assets/svges/bussiness.svg';
import FitnessSvg from '../assets/svges/fitness.svg';
import CryptoSvg from '../assets/svges/crypto.svg';
import MindsetSvg from '../assets/svges/mindset.svg';
import SearchSvg from '../assets/svges/search.svg';
import NotificationSvg from '../assets/svges/notification.svg'
import UserProfile from '../assets/images/userProfile.png';
import EditProfileIcon from '../assets/svges/editProfile.svg';
import ChatSettingIcon from '../assets/svges/chatSettings.svg';
import PrivacySettingIcon from '../assets/svges/privacySetting.svg';
import SettingIcon from '../assets/svges/setting.svg';
import AppSettingIcon from '../assets/svges/appSetting.svg';
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import SignOutIcon from '../assets/svges/signOut.svg';

import { useSelector } from 'react-redux';
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Header = ({ children, toggleValue }) => {
    const { user, isLoading, error } = useSelector((state) => state.userDetail);
    const navigate = useNavigate();
    const [profileDropDown, setProfileDropDown] = useState(false)
    // Sign Out Function
    const signOutFunc = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }



    return (
        <div>
            <div className="header-main-wrapper">
                <div className="header-main-inner-wrapper">
                    <div className="container">
                        <div className="container-inner-wrapper d-flex align-items-center justify-content-between">
                            <div className="toogle-burger-wrapper">
                                <button className="toggle-btn" onClick={toggleValue}>
                                    ☰
                                </button>
                            </div>
                            <div className="logo-wrapper">
                                <img src={EquityNameLogo} alt="" />
                            </div>
                            <div className="icons-wrapper d-flex gap-5">
                                <div className="icon-wrapper d-flex align-items-center flex-column">
                                    <div className="icon-logo">
                                        <img src={BussinessSvg} alt="" />
                                    </div>
                                    <div className="icon-name">
                                        Bussiness
                                    </div>
                                </div>
                                <div className="icon-wrapper d-flex align-items-center flex-column">
                                    <div className="icon-logo">
                                        <img src={FitnessSvg} alt="" />
                                    </div>
                                    <div className="icon-name">
                                        Fitness
                                    </div>
                                </div>
                                <div className="icon-wrapper d-flex align-items-center flex-column">
                                    <div className="icon-logo">
                                        <img src={CryptoSvg} alt="" />
                                    </div>
                                    <div className="icon-name">
                                        Crypto
                                    </div>
                                </div>
                                <div className="icon-wrapper d-flex align-items-center flex-column">
                                    <div className="icon-logo">
                                        <img src={MindsetSvg} alt="" />
                                    </div>
                                    <div className="icon-name">
                                        Mindset
                                    </div>
                                </div>
                            </div>
                            <div className="right-content-wrapper d-flex align-items-center gap-2">
                                <div className="search-bar-main-wrapper">
                                    <div className="search-wrapper">
                                        <div className="icon-wrapper d-flex">
                                            <img src={SearchSvg} alt="" />
                                        </div>
                                        <input type="search" placeholder='Search for users' />
                                    </div>
                                </div>
                                <div className="notification-main-wrapper">
                                    <img src={NotificationSvg} alt="" />
                                </div>
                                <div className="user-profile-main-wrapper d-flex">
                                    <img src={UserProfile} alt="" onClick={() => setProfileDropDown(!profileDropDown)} />
                                    {
                                        profileDropDown && <div className="profile-menu-bar">
                                            <div className="profile-info-wrapper">
                                                <div className="user-intro d-flex align-items-center gap-2">
                                                    <div className="img-wrapper">
                                                        <img src={UserProfile} alt="" />

                                                    </div>
                                                    <div className="user-about">
                                                        <h6 className='user-name m-0'>
                                                            {!user ? 'user not found' : user.name}
                                                        </h6>
                                                        <p className="user-email m-0">
                                                            {!user ? 'email not found' : user.email}
                                                        </p>

                                                    </div>
                                                </div>
                                                <Nav.Link as={Link} to="/userProfile" className="view-profile-link" onClick={() => setProfileDropDown(false)}> 
                                                    <p className='view-profile text-center mt-3 mb-1'>
                                                        view profile
                                                    </p>
                                                </Nav.Link>
                                            </div>
                                            <div className="other-menus">
                                                <div className="tiles-wrapper d-flex flex-column gap-3">
                                                    <div className="tile d-flex justify-content-between">
                                                        <div className="tile-content d-flex align-items-center gap-2">
                                                            <div className="icon-wrapper">
                                                                <img src={EditProfileIcon} alt="" />
                                                            </div>
                                                            <div className="icon-name">
                                                                Edit Profile
                                                            </div>
                                                        </div>
                                                        <div className="next-page-arrow">
                                                            <FaChevronRight />
                                                        </div>
                                                    </div>
                                                    <div className="tile d-flex justify-content-between">
                                                        <div className="tile-content d-flex align-items-center gap-2">
                                                            <div className="icon-wrapper">
                                                                <img src={SettingIcon} alt="" />
                                                            </div>
                                                            <div className="icon-name">
                                                                Account Settings
                                                            </div>
                                                        </div>
                                                        <div className="next-page-arrow">
                                                            <FaChevronRight />
                                                        </div>
                                                    </div>
                                                    <div className="tile d-flex justify-content-between">
                                                        <div className="tile-content d-flex align-items-center gap-2">
                                                            <div className="icon-wrapper">
                                                                <img src={AppSettingIcon} alt="" />
                                                            </div>
                                                            <div className="icon-name">
                                                                App Settings
                                                            </div>
                                                        </div>
                                                        <div className="next-page-arrow">
                                                            <FaChevronRight />
                                                        </div>
                                                    </div>
                                                    <div className="tile d-flex justify-content-between">
                                                        <div className="tile-content d-flex align-items-center gap-2">
                                                            <div className="icon-wrapper">
                                                                <img src={ChatSettingIcon} alt="" />
                                                            </div>
                                                            <div className="icon-name">
                                                                Chat Settings
                                                            </div>
                                                        </div>
                                                        <div className="next-page-arrow">
                                                            <FaChevronRight />
                                                        </div>
                                                    </div>
                                                    <div className="tile d-flex justify-content-between">
                                                        <div className="tile-content d-flex align-items-center gap-2">
                                                            <div className="icon-wrapper">
                                                                <img src={PrivacySettingIcon} alt="" />
                                                            </div>
                                                            <div className="icon-name">
                                                                Privacy Settings
                                                            </div>
                                                        </div>
                                                        <div className="next-page-arrow">
                                                            <FaChevronRight />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sing-out-wrapper" onClick={signOutFunc}>
                                                <div className="sign-out-btn d-flex gap-2">
                                                    <div className="icon-wrapper">
                                                        <img src={SignOutIcon} alt="" />
                                                    </div>
                                                    <p className='m-0'>Sing out</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {children}
            </div>

        </div>
    )
}

export default Header
