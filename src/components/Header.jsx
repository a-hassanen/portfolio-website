import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

const Header = ({ name, showEditorLink }) => {
  const [activeItem, setActiveItem] = useState('aboutme');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuItems = [
    { id: 'aboutme', label: 'About Me' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'badges', label: 'Badges' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveItem(id);
    const element = document.getElementById(id);
    if (element) {
      const header = document.querySelector('.header');
      const offset = header ? header.offsetHeight : 0;
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: 'smooth'
      });
    }
  };

  // --- Dark mode effect ---
  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return (
    <header className={`header ${isDarkMode ? 'dark' : ''}`}>
      <div className="header-container">
        <div className="logo">{name}</div>
        <nav className="nav-links">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`nav-button ${activeItem === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          {showEditorLink && (
            <button
              onClick={(e) => handleNavClick(e, 'edit')}
              className="nav-button editor"
            >
              Editor
            </button>
          )}
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="nav-button dark-toggle"
          >
            {isDarkMode ? "🌞" : "🌙"}
        </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
