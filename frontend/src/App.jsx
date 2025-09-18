import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }, [])
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#A8FBD3] to-[#27cac7]">
      {
        loading ? <div className='flex justify-center items-center h-screen'>
          <div className='loader'></div>
        </div> : <>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              }/>
            </Routes>
          </Router>
        </AuthProvider>
        </>
      }
    </div>
  )
}

export default App
