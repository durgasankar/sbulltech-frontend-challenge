import React from 'react';
import sbullLogo from '../assets/images/sensibull_logo.png';
import CustomSearchBox from './CustomSearchBox';

export default function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <img src={sbullLogo} alt="sensibull-logo" className='header__logo--image' />
            </div>
            <div className="header__search">
                <CustomSearchBox />
            </div>
            <div className="header__login"></div>
        </header>
    )
}
