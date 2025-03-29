import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ToastContainer,toast } from 'react-toastify'
import { JobApplicationProvider } from "./context/JobApplicationContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <JobApplicationProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    <App />
    </JobApplicationProvider>
    </UserProvider>
  </StrictMode>,
)
