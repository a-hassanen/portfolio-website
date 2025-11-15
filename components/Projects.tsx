
import React from 'react';
import Section from './Section';
import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-secondary rounded-lg shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
    <img src={project.imageUrl} alt={project.title} className="w-full h-56 object-cover"/>
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-2 text-light">{project.title}</h3>
      <p className="text-medium mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map(tech => (
          <span key={tech} className="bg-primary text-accent text-xs font-semibold px-2.5 py-1 rounded-full">{tech}</span>
        ))}
      </div>
      <div className="flex justify-end space-x-4">
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-medium hover:text-accent transition duration-300">
            Code
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-light bg-accent hover:bg-opacity-80 px-4 py-2 rounded-md transition duration-300">
            Live Demo
          </a>
        )}
      </div>
    </div>
  </div>
);

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <Section id="projects" title="Projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {projects.map((project, index) => <ProjectCard key={index} project={project} />)}
      </div>
    </Section>
  );
};

export default Projects;
