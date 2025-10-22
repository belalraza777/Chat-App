import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import { SocketProvider } from './context/socketContext.jsx';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>


)
