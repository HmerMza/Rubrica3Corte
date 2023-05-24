
import "./App.css";
import CompCarrousel from "./componentes/CompCarrousel";
import CompNavbar from "./componentes/CompNavbar";
import listPeliculas from "./data/listPeliculas";
import Probando from "./componentes/Probando";
import CompList from "./componentes/CompList";

function App() {
  
  
  
  return (
    <>
      <div className="head col-12">
        <CompNavbar peliculaList={listPeliculas} />
      </div>
      <div className="main">
        <CompCarrousel />
        <Probando />
      </div>
    </>
  );
}

export default App
