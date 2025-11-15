
import React, { useState } from 'react';
import type { Profile } from '../types';

interface HeaderProps {
  profile: Profile;
}

const Header: React.FC<HeaderProps> = ({ profile }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Badges', href: '#badges' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  
  return (
    <header className="bg-secondary sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-accent">AH</a>
        
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className="text-medium hover:text-light transition duration-300">{link.name}</a>
          ))}
        </div>

        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu">
                <svg className="w-6 h-6 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-secondary">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} onClick={(e) => handleScrollTo(e, link.href)} className="block px-6 py-3 text-medium hover:bg-primary hover:text-light transition duration-300">{link.name}</a>
          ))}
        </div>
      )}
      
      <div className="bg-primary text-center py-20 px-6">
        <img
          src={profile.profilePictureUrl}
          alt={profile.name}
          className="w-40 h-40 rounded-full mx-auto mb-6 border-4 border-accent shadow-xl"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold text-light mb-2">{profile.name}</h1>
        <p className="text-xl md:text-2xl text-accent font-light mb-4">{profile.title}</p>
        <p className="text-md md:text-lg text-medium max-w-3xl mx-auto">{profile.bio}</p>
      </div>
    </header>
  );
};

export default Header;
