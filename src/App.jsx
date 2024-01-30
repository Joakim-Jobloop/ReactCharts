import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PopulationAgesPage } from './pages/PopulationAgesPage'
import { LandingPage } from './pages/LandingPage'
import { OtherData } from './pages/OtherData'
import { Header } from './components/navigation/Header'

function App() {


  return (
    <>
     <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/PopulationAgesPage" element={<PopulationAgesPage />} />
        <Route path="/OtherData" element={<OtherData />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
