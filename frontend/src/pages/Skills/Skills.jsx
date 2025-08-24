import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Skills.css'
import SkillList from '../../components/SkillList/SkillList'

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const url = "http://localhost:4000";

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/skills/allskills`);
      if (response.data.success) {
        setSkills(response.data.data);
      } else {
        setError('Failed to fetch skills');
      }
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError('Network error while fetching skills');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='skill-container'>
        <h1 className='skills-heading'>Skills:</h1>
        <p>Loading skills...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='skill-container'>
        <h1 className='skills-heading'>Skills:</h1>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className='skill-container'>
        <SkillList skills={skills} url={url} />
      </div>
    </>
  )
}

export default Skills
