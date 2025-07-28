import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import LoadingScreen from './components/LoadingScreen/LoadingScreen.jsx';

function MainApp() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onLoadingComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <App />
        </>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  </StrictMode>,
)
