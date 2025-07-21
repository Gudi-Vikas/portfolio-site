import React, { useState } from 'react';
import ProjectsGrid from '../../components/ProjectsGrid/ProjectsGrid';
import { projects } from '../../assets/assets';
import './Projects.css';

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>

      <div className={`projects-page${modalOpen ? ' modal-open' : ''}`}>
        <h1 className='projects-title'>Projects</h1>
        <p className='projects-subtitle'>A selection of my favorite web projects, built with modern tools and a passion for clean design.</p>
        <ProjectsGrid projects={projects} setModalOpen={setModalOpen} />
      </div>
    </>
  );
};

export default Projects;

