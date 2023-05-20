import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Libros from './views/Libros.jsx';
import ViewLogin from './views/ViewLogin.jsx';


const routes = [
  {
    path: "/",
    element: <App/>
  }, {
    path: "/libros",
    element: <Libros/>
  }, {
    path: "/login",
    element: <ViewLogin/>
  }
]

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
