import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';
import '../styles/Contact.css';

const Contact = ({ personalInfo }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="contact" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <h2>Contact</h2>
            <div className="card social-links">
                <p>You can reach me via email or connect with me on social media.</p>
                <p><a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></p>
                <p>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a> | 
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </p>
            </div>
        </section>
    );
};

export default Contact;