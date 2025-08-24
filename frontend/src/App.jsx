import { React } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Projects from './pages/Projects/Projects'
import Skills from './pages/Skills/Skills'
import Footer from './components/Footer/Footer'


const App = () => {
  const url = "http://localhost:4000"
  
  // Validate URL format
  if (!url || !url.startsWith('http')) {
    console.error('Invalid URL configuration:', url);
    return <div className="error-message">Configuration error: Invalid URL</div>;
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home url={url}/>} />
        <Route path='/contact' element={<Contact url={url}/>}/>
        <Route path='/about' element={<About url={url}/>} />
        <Route path='/projects' element={<Projects url={url} />} />
        <Route path='/skills' element={<Skills url={url}/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

