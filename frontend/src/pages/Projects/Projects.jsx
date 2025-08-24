import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectsGrid from '../../components/ProjectsGrid/ProjectsGrid';
import './Projects.css';

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const url = "http://localhost:4000";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/projects/allprojects`);
      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Network error while fetching projects');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="projects-page">
        <h1 className='projects-title'>Projects</h1>
        <p className='projects-subtitle'>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-page">
        <h1 className='projects-title'>Projects</h1>
        <p className='projects-subtitle'>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className={`projects-page${modalOpen ? ' modal-open' : ''}`}>
        <h1 className='projects-title'>Projects</h1>
        <p className='projects-subtitle'>A selection of my favorite web projects, built with modern tools and a passion for clean design.</p>
        <ProjectsGrid 
          projects={projects} 
          setModalOpen={setModalOpen} 
          fetchProjects={fetchProjects}
          url={url}
        />
      </div>
    </>
  );
};

export default Projects;

