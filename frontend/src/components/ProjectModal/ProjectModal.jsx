import React from 'react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose,url }) => {
  // Handle case where project might not have all properties
  const projectImage = url + project.image || project.src || '';
  const projectTitle = project.title || 'Untitled Project';
  const projectDesc = project.desc || project.description || 'No description available';
  const projectTech = project.technologies || ['React', 'Vite', 'Node.js'];
  const projectStarted = project.started || 'Not specified';
  const projectCompleted = project.completed || 'In progress';
  const projectRepo = project.repo || '';
  const projectDemo = project.demo || '';

  return (
    <div className='project-modal-overlay' onClick={onClose}>
      <div className='project-modal' onClick={e => e.stopPropagation()}>
        <button className='modal-close' onClick={onClose}>&times;</button>
        <div className='modal-content'>
          <div className='modal-left'>
            {projectImage && (
              <img src={projectImage} alt={projectTitle} className='modal-img' />
            )}
            <h2 className='modal-overview-title'>Project Overview</h2>
            <p className='modal-overview-desc'>{projectDesc}</p>
          </div>
          <div className='modal-right modal-details-card'>
            <h3 className='modal-details-title'>Project Details</h3>
            <div className='modal-details-section'>
              <div className='modal-details-label'>Technologies</div>
              <div className='modal-tech-badges'>
                {Array.isArray(projectTech) ? projectTech.map((tech, i) => (
                  <span className='modal-tech-badge' key={i}>{tech}</span>
                )) : (
                  <span className='modal-tech-badge'>{projectTech}</span>
                )}
              </div>
            </div>
            <div className='modal-details-section'>
              <div className='modal-details-label'>Timeline</div>
              <div className='modal-timeline'>
                <div>Started: {projectStarted}</div>
                <div>Completed: {projectCompleted}</div>
              </div>
            </div>
            <div className='modal-details-section modal-links'>
              {projectRepo && (
                <a href={projectRepo} target='_blank' rel='noopener noreferrer' className='modal-link'>
                  <span role='img' aria-label='repo'>🐙</span> View Repository
                </a>
              )}
              {projectDemo && (
                <a href={projectDemo} target='_blank' rel='noopener noreferrer' className='modal-link'>
                  <span role='img' aria-label='demo'>🔗</span> View Live Demo
                </a>
              )}
              {!projectRepo && !projectDemo && (
                <div className='modal-no-links'>No links available for this project</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal; 