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
                {isNarrow ? (
                  <>Full-stack developer skilled in React, Vite, Node.js, Express, and MongoDB. Exploring ML and DSA to build scalable, real-world solutions. Tech-savvy. Curious. Problem solver.</>
                ) : (
                  <>
                    I'm a full-stack web developer with hands-on experience in building modern, high-performance applications using React, Vite, Node.js, Express, and MongoDB. I enjoy crafting seamless user interfaces and building efficient backend systems.
                    <br /><br />
                    Currently, I'm expanding my skill set by diving into Machine Learning and mastering Data Structures & Algorithms — aiming to solve real-world problems with clean, scalable code.
                    <br /><br />
                    Tech-savvy. Constant learner. Problem solver.
                  </>
                )}
               <Link to='/projects'> <button className='explore-button'>Explore My work</button></Link>
            </div>
        </div>
    )
}

export default HomeContent
