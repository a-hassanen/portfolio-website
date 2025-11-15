
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-12 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-light text-center">
        {title}
        <span className="block h-1 w-20 bg-accent mx-auto mt-2"></span>
      </h2>
      {children}
    </section>
  );
};

export default Section;
