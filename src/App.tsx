import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/login/Login";
import Footer from "./shared/footer/Footer";
import Navbar from "./shared/navbar/Navbar";
import Home from "./features/home/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Agrega aquí más rutas si las necesitas */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
