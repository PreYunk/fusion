import React from 'react';
import classes from './Logo.css';
import fusionLogo from '../../assets/SVG/logo.svg';

const logo = (props) => {
    return (
        <img className={classes.LogoHome} src={fusionLogo} alt="LOGO"/>
    );
};

export default logo;