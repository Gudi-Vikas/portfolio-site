import React, { useEffect, useState } from 'react'
import './HomeContent.css'
import { Link } from 'react-router-dom'


const HomeContent = () => {
    const [show, setShow] = useState(window.innerWidth > 892);
    const [isNarrow, setIsNarrow] = useState(window.innerWidth < 1210);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 892);


    // Update visibility and about text on resize
    useEffect(() => {
        const handleResize = () => {
            setShow(window.innerWidth > 892);
            setIsNarrow(window.innerWidth < 1210);
            setIsMobile(window.innerWidth <= 892);
        };
        window.addEventListener('resize', handleResize);
        handleResize()
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mobile Layout
    if (isMobile) {
        return (
            <div className="mobile-home-container">
                <div className="mobile-content">
                    <h1 className="mobile-author">Vikas Gudi</h1>
                    <div className="mobile-headline">Full Stack Developer & Innovator</div>
                    <p className="mobile-intro">
                        I build high-performance web applications with a passion for clean code and seamless user experiences. Always learning, always building.
                    </p>
                    <p className="mobile-ml">Currently exploring Machine Learning.</p>
                    <div className="mobile-skills">
                        <span className="mobile-skill">React</span>
                        <span className="mobile-skill">Node.js</span>
                        <span className="mobile-skill">Express</span>
                        <span className="mobile-skill">MongoDB</span>
                        <span className="mobile-skill">Machine Learning</span>
                    </div>

                    <Link to='/projects'>
                        <button className="mobile-explore-button">Explore My Work</button>
                    </Link>
                </div>
            </div>
        );
    }

    // Desktop Layout (existing)
    if (!show) return null;

    return (
        <div>
            <div className="left-slide-in left-hero">
                <div className="hero-author-img">
                    <div className="hero-details ">
                        <img src="/author.png" alt="" />
                        <h1>VIKAS<br />GUDI</h1>
                    </div>


                </div>
                <div className="hero-skills">
                    <span>• Full-Stack Developer   •  React  <br /> • Node • MongoDB  • ML</span>
                </div>
                <div className="hero-links">
                    <a target="_blank" href="">Resume</a>
                    <a target="_blank" href="https://github.com/Gudi-Vikas">GitHub</a>
                    <a target="_blank" href="https://www.linkedin.com/in/vikas-gudi">linkedIn</a>
                </div>
                <h3>Open to interships & junior roles</h3>
            </div>
            <div className="about right-slide-in">
                <>
                    <span className="headline">Full Stack Developer & Innovator</span>
                    <br />
                    I build high-performance web applications with a passion for clean code and seamless user experiences. Always learning, always building.
                    <br /><br />
                    Currently exploring Machine Learning.
                    <br /><br />
                    <span className="skills">• React •  Node.js   • Express<br /> • MongoDB <br /> • Machine Learning</span>
                    <br />
                    <Link to='/projects'> <button className='explore-button'>Explore My Work</button></Link>
                </>
            </div>
        </div>
    )
}

export default HomeContent
