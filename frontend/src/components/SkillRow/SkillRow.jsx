import React from 'react'
import './SkillRow.css'
const SkillRow = ({ title, skills }) => (
  <section className='skill-row'>
    <h2 className='row-heading'>{title}</h2>
    <div className='skills-grid'>
      {skills.map((skill) => (
        skill.link ? (
          <a
            href={skill.link}
            target='_blank'
            rel='noopener noreferrer'
            className='skill-card-link'
            key={skill.name}
          >
            <div className='skill-card'>
              <img src={skill.logo} alt={skill.name} />
              <p>{skill.name}</p>
            </div>
          </a>
        ) : (
          <div className='skill-card' key={skill.name}>
            <img src={skill.logo} alt={skill.name} />
            <p>{skill.name}</p>
          </div>
        )
      ))}
    </div>
  </section>
)

export default SkillRow
