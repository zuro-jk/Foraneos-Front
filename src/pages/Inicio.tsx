import '../styles/Inicio.css'
import comidaImg from '../image/inicio/comida.webp' // reemplaza por tu imagen

const Inicio = () => {
  return (
    <>
    <div className="home-container">
      <div className="home-left">
        <h1 className="title">Foraneos <span>IA</span></h1>
        <p>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
          Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500
        </p>
        <button>Comenzar</button>
      </div>
      <div className="home-right">
        <img src={comidaImg} alt="comida saludable" />
      </div>
    </div>
    </>
  )
}

export default Inicio
