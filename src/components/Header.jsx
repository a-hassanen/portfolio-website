import React from 'react';
import '../styles/Header.css';

const Header = ({ name, showEditorLink }) => (
  <header className="header">
    <nav>
      <a href="/#" className="logo">{name}</a>
      <div className="nav-links">
        <a href="/#experience">Experience</a>
        <a href="/#skills">Skills</a>
        <a href="/#projects">Projects</a>
        <a href="/#resume">Resume</a>
        <a href="/#contact">Contact</a>
        {showEditorLink && <a href="/#edit" className="button">Editor</a>}
      </div>
    </nav>
  </header>
);

export default Header;