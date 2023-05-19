
import './App.css'
import CardBootstrap from './componentes/CardBootstrap'
import CompNavbar from './componentes/CompNavbar'
import listPeliculas from './data/listPeliculas'

function App() {
  const peliculalist = listPeliculas.map(p => {
    return <CardBootstrap title={p.name} image={p.image} description={p.description} />
    
  })
  return (
    <>
      <div className='head' style={{width:'80%', margin:'auto'}} >
        <CompNavbar peliculaList={listPeliculas}/>
      </div>
      <div className='main'>
        <div className="container">
          {peliculalist}
          
        </div>
      </div>
      
    </>
  )
}

export default App
