
import React from 'react';
import Section from './Section';

interface AboutProps {
  about: string;
}

const About: React.FC<AboutProps> = ({ about }) => {
  return (
    <Section id="about" title="About Me">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-xl text-medium leading-relaxed">
          {about}
        </p>
      </div>
    </Section>
  );
};

export default About;
