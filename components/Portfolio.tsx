import React from 'react';
import type { PortfolioData } from '../types';
import Header from './Header';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Badges from './Badges';
import Contact from './Contact';

interface PortfolioProps {
  data: PortfolioData;
}

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-primary">
      <Header profile={data.profile} />
      <main className="container mx-auto px-6 md:px-12 py-12 space-y-24">
        <About about={data.about} />
        <Experience experience={data.experience} />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Badges badges={data.badges} />
        <Contact contact={data.profile.contact} name={data.profile.name} />
      </main>
    </div>
  );
};

export default Portfolio;
