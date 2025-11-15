import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver.jsx';
import '../styles/Skills.css';

const Skills = ({ items }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="skills" ref={ref} className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>
      <h2>Skills</h2>
      <div className="card">
          <ul className="skills-list">
          {items.map((skill, index) => (
              <li key={index}>{skill}</li>
          ))}
          </ul>
      </div>
    </section>
  );
};

export default Skills;