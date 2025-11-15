import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';
import '../styles/Hero.css';

const Hero = ({ personalInfo }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: false }); // Hero is at top, so might not need triggerOnce: true
    let imageUrl = '';
    // Use a try-catch block to prevent build errors if the path is invalid.
    // This Vite-specific syntax `new URL(...)` is used to correctly resolve asset paths
    // for files in `src` that are referenced dynamically.
    if (personalInfo.profileImage) {
        try {
            imageUrl = new URL(personalInfo.profileImage.replace('src', '..'), import.meta.url).href;
        } catch (e) {
            console.error(`Failed to construct image URL for: ${personalInfo.profileImage}`, e);
            // You could set a fallback image URL here if needed.
        }
    }

    return (
        <section ref={ref} className={`hero fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            {imageUrl && <img src={imageUrl} alt={personalInfo.name} className="profile-image" />}
            <h1>{personalInfo.name}</h1>
            <p className="title">{personalInfo.title}</p>
            <p className="bio">{personalInfo.bio}</p>
        </section>
    );
};

export default Hero;