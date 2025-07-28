import React from 'react'
import "./Home.css";
import HomeBackground from '../../components/HomeBackground/HomeBackground';
import HomeForeground from '../../components/HomeForeground/HomeForeground';

const Home = () => {
    return (
        <div className='home-container'>
            <HomeBackground />
            <HomeForeground 
                name="Vikas Gudi"
                headline="Full Stack Developer & Innovator"
                intro="I build high-performance web applications with a passion for clean code and seamless user experiences. Always learning, always building."
                skills="React • Node.js • Express • MongoDB • Vite • Machine Learning"
                ctaPrimary="Explore My Work"
                ctaSecondary="Contact Me"
            />
        </div>
    )
}

export default Home
