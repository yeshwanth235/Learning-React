import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar.jsx'
import UseEffect from './pages/UseEffect/Main'



function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/useEffect" element={<UseEffect />} />
      </Routes>
    </>
  )
}

export default App
