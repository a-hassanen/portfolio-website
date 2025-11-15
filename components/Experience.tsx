
import React from 'react';
import Section from './Section';
import type { Experience as ExperienceType } from '../types';

interface ExperienceProps {
  experience: ExperienceType[];
}

const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <Section id="experience" title="Work Experience">
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 w-0.5 h-full bg-secondary hidden md:block" style={{ transform: 'translateX(-50%)' }}></div>
        {experience.map((job, index) => (
          <div key={index} className={`mb-12 flex items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="hidden md:block w-1/2"></div>
            <div className={`relative w-full md:w-1/2 p-6 rounded-lg shadow-2xl bg-secondary ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
               <div className={`hidden md:block absolute top-1/2 w-4 h-4 bg-accent rounded-full ${index % 2 === 0 ? 'left-[-8.5px]' : 'right-[-8.5px]'}`} style={{ transform: 'translateY(-50%)' }}></div>
               <h3 className="text-2xl font-bold text-light">{job.role}</h3>
               <p className="text-accent text-lg mb-2">{job.company}</p>
               <p className="text-medium text-sm mb-4">{job.duration}</p>
               <ul className="list-disc list-inside text-medium space-y-2">
                 {job.description.map((desc, i) => <li key={i}>{desc}</li>)}
               </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
