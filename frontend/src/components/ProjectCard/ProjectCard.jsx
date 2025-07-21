import React from 'react';
import './ProjectCard.css';

const truncate = (text, maxLen = 90) =>
  text.length > maxLen ? text.slice(0, maxLen).trim() + '...' : text;

const ProjectCard = ({ image, title, desc, onSelect }) => (
  <div className='project-card' onClick={onSelect} tabIndex={0} role='button'>
    <img src={image} alt={title} className='project-img' />
    <div className='project-info'>
      <h2>{title}</h2>
      <p>{truncate(desc)}</p>
    </div>
  </div>
);

export default ProjectCard; 