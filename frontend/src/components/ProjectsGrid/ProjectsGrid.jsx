import React, { useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectModal from '../ProjectModal/ProjectModal';
import './ProjectsGrid.css';

/**
 * ProjectsGrid displays a grid of ProjectCard components and handles modal state.
 * Props:
 *   projects: array of project objects
 *   setModalOpen: function to control background darkening in parent
 */
const ProjectsGrid = ({ projects, setModalOpen }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Open modal with selected project
  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen && setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen && setModalOpen(false);
  };

  return (
    <>
      <div className='projects-grid'>
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            image={project.image}
            title={project.title}
            desc={project.desc}
            onSelect={() => openModal({ ...project, idx })}
          />
        ))}
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ProjectsGrid; 