import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects/Projects';
import Messages from './pages/Messages/Messages';
import Login from './pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './contexts/AuthContext.jsx';

const App = () => {
  //for testing
  // const url ='http://localhost:4000';

  // for deployment

  const url =   'https://portfolio-site-35zd.onrender.com'

  const { isAuthed } = useAuth();
  const RequireAuth = ({ children }) => (isAuthed ? children : <Navigate to="/login" replace />);
  return (
    <div>
      {isAuthed ? <Navbar /> : null}
      <div className="app-content">
        {isAuthed ? <Sidebar /> : null}
        <Routes>
          <Route path='/' element={<Navigate to={isAuthed ? "/skills" : "/login"} replace />} />
          <Route path='/login' element={<Login url={url} />} />
          <Route path='/skills' element={<RequireAuth><Skills url={url} /></RequireAuth>} />
          <Route path='/projects' element={<RequireAuth><Projects url={url} /></RequireAuth>} />
          <Route path='/messages' element={<RequireAuth><Messages url={url} /></RequireAuth>} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
