import React from 'react'
import CardBootstrap from '../componentes/CardBootstrap'
import CompNavbar from '../componentes/CompNavbar'
import listPeliculas from '../data/listPeliculas'
import CompLogin from '../componentes/CompLogin'

const ViewLogin = () => {
  const peliculalist = listPeliculas.map(p => {
    return <CardBootstrap title={p.name} image={p.image} description={p.description} />
    
  })
  return (
    <>
      <div className='head col-12'>
        <CompNavbar peliculaList={listPeliculas}/>
      </div>
      <div className='main'>
              <div className="container">
                  <CompLogin/>
        
        </div>
      </div>      
    </>
  )
}

export default ViewLogin