
import './App.css'
import CompCarrousel from './componentes/CompCarrousel'
import CompNavbar from './componentes/CompNavbar'
import listPeliculas from './data/listPeliculas'

function App() {
  return (
    <>
      <div className='head col-12'>
        <CompNavbar peliculaList={listPeliculas}/>
      </div>
      <div className='main'>
        <CompCarrousel/>
      </div>
    </>
  )
}

export default App
