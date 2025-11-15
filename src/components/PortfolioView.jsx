import React from 'react';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import Experience from './Experience.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';
import Certificates from './Certificates.jsx';
import Badges from './Badges.jsx';
import Resume from './Resume.jsx';
import Contact from './Contact.jsx';
import Footer from './Footer.jsx';

const PortfolioView = ({ data }) => (
  <React.Fragment>
    <Header name={data.personalInfo.name} showEditorLink={false} />
    <main className="app-container">
      <Hero personalInfo={data.personalInfo} />
      <Experience items={data.experience} />
      <Skills items={data.skills} />
      <Projects items={data.projects} />
      <Resume />
      <Certificates items={data.certificates} />
      <Badges items={data.badges} />
      <Contact personalInfo={data.personalInfo} />
    </main>
    <Footer name={data.personalInfo.name}/>
  </React.Fragment>
);

export default PortfolioView;