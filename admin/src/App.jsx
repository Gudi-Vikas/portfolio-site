import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Skills from './pages/Skills/Skills'
import Projects from './pages/Projects/Projects'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Messages from './pages/Messages/Messages'


const App = () => {
  const url = 'http://localhost:4000'
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/' element={<Navigate to="/skills" url={url} replace />} />
          <Route path='/skills' element={<Skills url={url} />} />
          < Route path='/projects' element={<Projects url={url} />} />
          < Route path='/messages' element={<Messages url={url}/>}/>
        </Routes>
      </div>
      <ToastContainer />

    </div>
  )
}

export default App
