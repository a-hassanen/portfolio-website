import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';

const Certificates = ({ items }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="certificates" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <h2>Certificates</h2>
      <div className="card">
        <ul>
          {items.map((cert, index) => (
            <li key={index}><a href={cert.link} target="_blank" rel="noopener noreferrer">{cert.name}</a></li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Certificates;