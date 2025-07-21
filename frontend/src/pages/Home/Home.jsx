import React from 'react'
import "./Home.css";
import HomeBackground from '../../components/HomeBackground/HomeBackground';
import HomeForeground from '../../components/HomeForeground/HomeForeground';

const Home = () => {
    return (
        <div className='home-container'>
            <HomeBackground />
            <HomeForeground />
        </div>
    )
}

export default Home
