
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Projects.css';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = useCallback(() => {
        setLoading(true);
        axios.get('/api/projects/')
            .then(response => {
                setProjects(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the projects!', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <section id="projects">
            <button onClick={fetchProjects} className="reload-button" aria-label="Reload projects">
                🔄
            </button>
            <h2>My Projects</h2>
            {loading ? (
                <p className="loading-text">projects loading...</p>
            ) : (
                <div className="projects-container">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default Projects;
