import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import Right from './components/chat/rightPart/Right';
import Left from './components/chat/leftPart/Left';
import Profile from './components/profile/Profile';
import ProtectedRoute from './protected/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useConversation from './store/zustand';
import './App.css';


function App() {
  const { selectedConversation } = useConversation();

  return (
    <>
      <Routes>
        {/* Protected route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="app-container">
                <div className={`app-sidebar ${selectedConversation ? 'app-sidebar--hidden' : ''}`}>
                  <Left />
                </div>
                <div className={`app-chat ${selectedConversation ? 'app-chat--visible' : ''}`}>
                  <Right />
                </div>
              </div>
            </ProtectedRoute>
          }
        />


        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>


      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
