import React, { useState } from 'react';

const CompLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar la lógica de autenticación o enviar los datos a un servidor
    console.log('Email:', email);
    console.log('Password:', password);
    // Reiniciar los campos de entrada después del envío
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Inicie Sesion</h2>
         <hr className="dropdown-divider"/>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo</label>
          <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} required placeholder='Ingrese Su Correo'/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label"> Contraseña </label>
          <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} required placeholder='Ingrese Su Contraseña'/>
        </div>
        <button type="submit" className="btn btn-primary m-2"> Login </button>
        <button type="submit" className="btn btn-secondary m-2"> Registrarse</button>
      </form>
    </div>
  );
};

export default CompLogin;