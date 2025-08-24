import React from 'react'
import './SkillRow.css'

const SkillRow = ({ title, skills, url }) => (
  <section className='skill-row'>
    <h2 className='row-heading'>{title} :</h2>
    <div className='skills-grid'>
      {skills.map((skill) => (
        skill.link ? (
          <a
            href={skill.link}
            target='_blank'
            rel='noopener noreferrer'
            className='skill-card-link'
            key={skill._id}
          >
            <div className='skill-card'>
              <img src={url + skill.image} alt={skill.name} />
              <p>{skill.name}</p>
            </div>
          </a>
        ) : (
          <div className='skill-card' key={skill._id}>
            <img src={url + skill.image} alt={skill.name} />
            <p>{skill.name}</p>
          </div>
        )
      ))}
    </div>
  </section>
)

export default SkillRow
