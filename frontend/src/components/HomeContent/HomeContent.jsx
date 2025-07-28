import React, { useEffect, useState } from 'react'
import './HomeContent.css'
import { Link } from 'react-router-dom'

const HomeContent = () => {
    const [show, setShow] = useState(window.innerWidth > 892);
    const [isNarrow, setIsNarrow] = useState(window.innerWidth < 1210);

    // Update visibility and about text on resize
    useEffect(() => {
        const handleResize = () => {
            setShow(window.innerWidth > 892);
            setIsNarrow(window.innerWidth < 1210);
        };
        window.addEventListener('resize', handleResize);
        handleResize()
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!show) return null;

    return (
        <div>
            <h1 className='author left-slide-in'>Vikas <br /> Gudi</h1>
            <div className="about right-slide-in">
                <>
                  <span className="headline">Full Stack Developer & Innovator</span>
                  <br /><br />
                  I build high-performance web applications with a passion for clean code and seamless user experiences. Always learning, always building.
                  <br /><br />
                  Currently exploring Machine Learning.
                  <br /><br />
                  <span className="skills">• React<br/> •  Node.js   • Express • MongoDB <br/> • Machine Learning</span>
                  <br /><br />
                  <Link to='/projects'> <button className='explore-button'>Explore My Work</button></Link>
                </>
            </div>
        </div>
    )
}

export default HomeContent
