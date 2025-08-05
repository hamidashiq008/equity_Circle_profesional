import React from 'react'
import EquityNameLogo from '../assets/images/Equity-light.logo.png';
import BussinessSvg from '../assets/svges/bussiness.svg';
import FitnessSvg from '../assets/svges/fitness.svg';
import CryptoSvg from '../assets/svges/crypto.svg';
import MindsetSvg from '../assets/svges/mindset.svg';
import SearchSvg from '../assets/svges/search.svg';
import NotificationSvg from '../assets/svges/notification.svg'
import UserProfile from '../assets/images/userProfile.png'
const Header = ({ children, toggleValue }) => {
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
                                <div className="user-profile d-flex">
                                    <img src={UserProfile} alt="" />
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
