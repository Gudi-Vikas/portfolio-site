import React from 'react'
import './About.css'
import { resume, socialMediaLogo } from '../../assets/assets'
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  return (
    
    <div className="about-container">
      <div className="about-parent-card">
        <div className="about-left about-child-card animate-left-panel">
          <img className="about-left-top animate-left-img" src='/author2.png' alt="Profile" />
          <div className="about-left-bottom">
            <h2 className="animate-left-heading">Education</h2>
            <p className="animate-left-para">Bachelor of Technology in Computer Science and Engineering (CSE) with AI & ML from <span>2024 to 2028</span></p>
            <div className="university-container animate-left-uni">
              <img src="/universityLogo.jpg" alt="" />
              <h4>UTTARANCHAL UNIVERSITY.</h4><br />
            </div>
          </div>
        </div>
        <div className="about-right about-child-card animate-right-panel">
          <div className="about-right-top">
            <h1 className="animate-right-heading">ABOUT ME</h1>
            <p className="animate-right-para">
              I'm a full-stack web developer with a strong foundation in building modern, high-performance applications using React, Vite, Node.js, Express, and MongoDB. I enjoy crafting seamless user interfaces and developing clean, scalable backend systems.<br/>
              Currently, I'm deepening my skills in Machine Learning and Data Structures & Algorithms to solve real-world problems with efficiency and precision. <br />
              Outside of tech, I love watching movies, creating art, and travelling — these passions keep me inspired, creative, and constantly learning from different perspectives.
            </p>
            <div className="right-top-button-container">
              <button className="resume-download animate-btn-1"><a target='_blank' href={resume}>Download Resume</a></button>
              <button className="resume-download animate-btn-2" onClick={() => navigate("/contact")} >Get in Touch </button>
            </div>
          </div>
          <div className="about-right-bottom">
              {socialMediaLogo.map((each, idx) => (
                <a href={each.link}  className='social-media-icons-link' target='_blank'><img src={each.logo}  className={`social-media-icons animate-icon-${idx+1}`} alt="social-media" key={idx} /></a>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
