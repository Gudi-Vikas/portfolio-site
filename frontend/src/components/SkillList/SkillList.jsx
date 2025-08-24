import React from 'react'
import './SkillList.css'
import SkillRow from '../SkillRow/SkillRow'

//SkillList displays all skill categories using SkillRow.

const SkillList = ({ skills, url }) => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <>
      <h1 className='skills-heading'>Skills:</h1>
      <div className='all-skills'>
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <SkillRow 
            key={category}
            title={category} 
            skills={categorySkills} 
            url={url}
          />
        ))}
      </div>
    </>
  )
}

export default SkillList
