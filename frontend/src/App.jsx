import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000)
  }, [])
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#A8FBD3]">
      {
        loading ? <div className='flex justify-center items-center h-screen'>
          <div className='loader'></div>
        </div> : <>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
          </Routes>
        </Router>
        </>
      }
    </div>
  )
}

export default App
