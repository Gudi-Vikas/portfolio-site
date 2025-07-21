import React from 'react';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => (
  <div className='project-modal-overlay'>
    <div className='project-modal' onClick={e => e.stopPropagation()}>
      <button className='modal-close' onClick={onClose}>&times;</button>
      <div className='modal-content'>
        <div className='modal-left'>
          <img src={project.image} alt={project.title} className='modal-img' />
          <h2 className='modal-overview-title'>Project Overview</h2>
          <p className='modal-overview-desc'>{project.desc}</p>
        </div>
        <div className='modal-right modal-details-card'>
          <h3 className='modal-details-title'>Project Details</h3>
          <div className='modal-details-section'>
            <div className='modal-details-label'>Technologies</div>
            <div className='modal-tech-badges'>
              {(project.technologies || ['React', 'Vite', 'Node.js']).map((tech, i) => (
                <span className='modal-tech-badge' key={i}>{tech}</span>
              ))}
            </div>
          </div>
          <div className='modal-details-section'>
            <div className='modal-details-label'>Timeline</div>
            <div className='modal-timeline'>
              <div>Started: {project.started || '2/1/2025'}</div>
              <div>Completed: {project.completed || '3/14/2025'}</div>
            </div>
          </div>
          <div className='modal-details-section modal-links'>
            {project.repo && (
              <a href={project.repo} target='_blank' rel='noopener noreferrer' className='modal-link'>
                <span role='img' aria-label='repo'>🐙</span> View Repository
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target='_blank' rel='noopener noreferrer' className='modal-link'>
                <span role='img' aria-label='demo'>🔗</span> View Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProjectModal; 