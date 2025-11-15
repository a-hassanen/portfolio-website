
import React from 'react';
import Section from './Section';
import type { SkillCategory } from '../types';

interface SkillsProps {
  skills: SkillCategory[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <Section id="skills" title="Skills">
      <div className="max-w-5xl mx-auto">
        {skills.map((category, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold text-accent mb-4">{category.category}</h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map(skill => (
                <div key={skill} className="bg-secondary text-light px-4 py-2 rounded-md shadow-md hover:bg-accent hover:text-primary transition-colors duration-300 cursor-default">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
