import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Login from './Components/Login/Login';
import { Route, Routes, Navigate } from 'react-router-dom';
import Skills from './pages/Skills/Skills';
import Projects from './pages/Projects/Projects';
import Messages from './pages/Messages/Messages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const url = 'https://vikasgudi.up.railway.app';

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/' element={<Navigate to="/skills" replace />} />
          <Route path='/skills' element={<Skills url={url} />} />
          <Route path='/projects' element={<Projects url={url} />} />
          <Route path='/messages' element={<Messages url={url} />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
