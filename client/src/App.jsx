import { Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import Right from './components/main/rightPart/right';
import Left from './components/main/leftPart/Left';
import ProtectedRoute from './protected/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
      <Routes>
        {/* Protected route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="flex h-screen">
                <Left />
                <Right />
              </div>
            </ProtectedRoute>
          }
        />


        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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
