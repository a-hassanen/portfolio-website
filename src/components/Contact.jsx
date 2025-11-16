import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';
import '../styles/Contact.css';

const Contact = ({ personalInfo }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    // Public icon URLs
    const icons = {
        email: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/maildotru.svg',
        github: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg',
        linkedin: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg',
        whatsapp: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg',
        phone: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/phone.svg',
        credly: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/credly.svg',
        googleSkills: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlescholar.svg',
        coursera: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/coursera.svg'
    };

    return (
        <section id="contact" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <h2>Contact</h2>
            <div className="card social-links">
                <p>You can reach me via email, phone, or connect with me online.</p>

                <div className="contact-grid">
                    {personalInfo.email && (
                        <a href={`mailto:${personalInfo.email}`} className="contact-button email">
                            <img src={icons.email} alt="Email" className="icon" /> {personalInfo.email}
                        </a>
                    )}
                    {personalInfo.github && (
                        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-button github">
                            <img src={icons.github} alt="GitHub" className="icon" /> GitHub
                        </a>
                    )}
                    {personalInfo.linkedin && (
                        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-button linkedin">
                            <img src={icons.linkedin} alt="LinkedIn" className="icon" /> LinkedIn
                        </a>
                    )}
                    {personalInfo.whatsapp1 && (
                        <a href={`https://wa.me/${personalInfo.whatsapp1}`} target="_blank" rel="noopener noreferrer" className="contact-button whatsapp">
                            <img src={icons.whatsapp} alt="WhatsApp" className="icon" /> WhatsApp 1
                        </a>
                    )}
                    {personalInfo.whatsapp2 && (
                        <a href={`https://wa.me/${personalInfo.whatsapp2}`} target="_blank" rel="noopener noreferrer" className="contact-button whatsapp">
                            <img src={icons.whatsapp} alt="WhatsApp" className="icon" /> WhatsApp 2
                        </a>
                    )}
                    {personalInfo.phone1 && (
                        <a href={`tel:${personalInfo.phone1}`} className="contact-button phone">
                            <img src={icons.phone} alt="Phone" className="icon" /> Call 1
                        </a>
                    )}
                    {personalInfo.phone2 && (
                        <a href={`tel:${personalInfo.phone2}`} className="contact-button phone">
                            <img src={icons.phone} alt="Phone" className="icon" /> Call 2
                        </a>
                    )}
                    {personalInfo.credly && (
                        <a href={personalInfo.credly} target="_blank" rel="noopener noreferrer" className="contact-button credly">
                            <img src={icons.credly} alt="Credly" className="icon" /> Credly
                        </a>
                    )}
                    {personalInfo.googleSkills && (
                        <a href={personalInfo.googleSkills} target="_blank" rel="noopener noreferrer" className="contact-button google-skills">
                            <img src={icons.googleSkills} alt="Google Skills" className="icon" /> Google Skills
                        </a>
                    )}
                    {personalInfo.coursera && (
                        <a href={personalInfo.coursera} target="_blank" rel="noopener noreferrer" className="contact-button coursera">
                            <img src={icons.coursera} alt="Coursera" className="icon" /> Coursera
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
