import React, { useState } from 'react'

const CardBootstrap = ({ title = "Titulo por defecto", image = "descripcion", description = "holamundo" }) => {
    
    const [show, setShow] = useState(true)
    
    const ocultar = () => {
        setShow(!show);
    }

  return (
      <div>
          <div className="card m-5" style={{ width: '18rem', height: '545px' }}>
              <div style={{height: '442px' }}>
                  {show ? <img src={image} className="card-img-top" alt="..." /> :<p className="card-text m-4"><h3 className=' mt-4'>Resumen</h3> {description}</p>} 
              </div>
              <div className="card-body" style={{height:'102px'}}>
                  <h5 className="card-title">{title}</h5>
                   <button className='btn btn-primary me-2'>Prestar</button>    
                  <button className='btn btn-secondary me-2' onClick={ocultar}>{show ? " + " : " - "}info</button> 
              </div> 
                    
               
          </div>
    
        </div>
  )
}

export default CardBootstrap
