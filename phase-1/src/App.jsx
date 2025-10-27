import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar.jsx'
import UseEffect from './pages/hooks/UseEffect/Main.jsx'
import Challenges from './pages/main/Challenges.jsx'
import Challenge1 from './pages/challenges/UseEffect/Challenge-1.jsx'
import UsecallbackUseMemo from './pages/hooks/UseCallBack-UseMemo/Main.jsx'

function App() {

  return (
    <>
      <Navbar />
      <div className="m-5 lg:m-20">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/useCallback-useMemo" element={<UsecallbackUseMemo />} />
          <Route path="/useEffect" element={<UseEffect />} />

          <Route path="/challenges" element={<Challenges />} />
          <Route path="/useEffect/challenge-1" element={<Challenge1 />} />
        </Routes>
      </div>
    </>
  )
}

export default App
