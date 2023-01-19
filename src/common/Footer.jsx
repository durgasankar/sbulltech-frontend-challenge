import React from 'react'
import { Icon } from 'semantic-ui-react';

const Footer = () => {
    return (
        <footer className='footer'>
            <p className='footer__text'>
                &#169; 2023 All Right Reserved. Share your feedback.
                <span className='footer__text--right'><Icon name='mail' />&nbsp; durgasankar.raja500@gmail.com</span>
            </p>
        </footer>
    )
}

export default Footer;