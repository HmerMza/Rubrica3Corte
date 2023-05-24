import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Libros from "./views/Libros.jsx";
import ViewLogin from "./views/ViewLogin.jsx";
import Register from "./views/Register.jsx";
import RegisterBook from "./views/RegisterBook.jsx";
import EliminarLibros from "./views/EliminarLibros.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/libros",
    element: <Libros />,
  },
  {
    path: "/login",
    element: <ViewLogin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register-book",
    element: <RegisterBook />,
  },
  {
    path: "/Eliminar-book",
    element: <EliminarLibros />,
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
