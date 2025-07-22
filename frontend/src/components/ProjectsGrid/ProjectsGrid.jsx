import React, { useState } from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectModal from '../ProjectModal/ProjectModal';
import './ProjectsGrid.css';

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