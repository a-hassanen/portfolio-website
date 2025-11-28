import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';
import '../styles/Hero.css';

const Hero = ({ personalInfo }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    // Resolve image path correctly in both DEV and GitHub Pages production
    // const imageUrl = personalInfo.profileImage
    //     ? `${import.meta.env.BASE_URL}${personalInfo.profileImage.replace(/^\//, '')}`
    //     : '';
    // Dynamically use Vite's base URL
    const base = import.meta.env.BASE_URL;
    const imageUrl = portfolioData.profileImage
    ? base + portfolioData.profileImage.replace(/^\//, "")
    : "";

    return (
        <section ref={ref} className={`hero fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            {imageUrl && (
                <img 
                    src={imageUrl} 
                    alt={`${personalInfo.name} profile picture`}
                    className="profile-image" 
                />
            )}
            <h1>{personalInfo.name}</h1>
            <p className="title">{personalInfo.title}</p>
            <p className="bio">{personalInfo.bio}</p>
        </section>
    );
};

export default Hero;
