import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Inicio from './pages/Inicio'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* Agrega aquí más rutas si las necesitas */}
      </Routes>
      <Footer />
    </>
  )
}

export default App
