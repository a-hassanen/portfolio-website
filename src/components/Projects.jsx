import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';

const Projects = ({ items }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
        <section id="projects" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
            <h2>Projects</h2>
            {items.map((item, index) => (
                <div key={index} className="card">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">View Project</a>
                </div>
            ))}
        </section>
    );
};

export default Projects;