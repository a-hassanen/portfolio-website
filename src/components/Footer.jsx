import React from 'react';
import '../styles/Footer.css';

const Footer = ({ name }) => (
    <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {name}. All Rights Reserved.</p>
    </footer>
);

export default Footer;