
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Skills.css';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSkills = useCallback(() => {
        setLoading(true);
        axios.get('/api/skills/')
            .then(response => {
                setSkills(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the skills!', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    return (
        <section id="skills">
            <button onClick={fetchSkills} className="reload-button" aria-label="Reload skills">
                🔄
            </button>
            <h2>My Skills</h2>
            {loading ? (
                <p className="loading-text">skills loading...</p>
            ) : (
                <div className="skills-container">
                    {skills.map(skill => (
                        <div className="skill-card" key={skill.id}>
                            <img src={skill.logo} alt={`${skill.name} logo`} />
                            <p>{skill.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Skills;
