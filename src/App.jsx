import "./App.css";
import CompNavbar from "./componentes/CompNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Libros from "./views/Libros.jsx";
import ViewLogin from "./views/ViewLogin.jsx";
import Home from "./views/Home";
import Register from "./views/Register.jsx";
import RegisterBook from "./views/RegisterBook.jsx";
import EliminarLibros from "./views/EliminarLibros.jsx";
import { useEffect, useState } from "react";
import { auth, db } from "./data/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import EditarLibro from "./views/EditarLibro";
import NoteFound from "./views/NoteFound";

function App() {
  const [listPeliculas, setListPeliculas] = useState([]);
  const [listPeliculasFilter, setListPeliculasFilter] = useState([]);
  const [isSingIn, setIsSingIn] = useState();
  const [dataUser, setDataUser] = useState({});

  const getBooks = async () => {
    try {
      await onSnapshot(collection(db, "libro"), (query) => {
        if (isSingIn) {
          const data = query.docs
            .filter(
              (doc) =>
                dataUser.L_Prestados.includes(doc.id) || doc.data().estado
            )
            .map((doc) => ({ id: doc.id, ...doc.data() }));
          console.log(data);
          setListPeliculas(data);
          setListPeliculasFilter(data);
        } else {
          const data = query.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setListPeliculas(data);
          setListPeliculasFilter(data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSingIn(user.uid);
      } else {
        setIsSingIn(null);
      }
    });
    getBooks();
  }, []);

  useEffect(() => {
    const getUser = () => {
      const userPromise = onSnapshot(collection(db, "usuario"), (query) => {
        const data = query.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find((user) => user.id === isSingIn);
        setDataUser(data);
      });
      Promise.all([userPromise, getBooks]);
    };
    if (isSingIn) {
      getUser();
    }
  }, [isSingIn]);

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/libros",
      element: (
        <Libros
          listPeliculas={listPeliculasFilter}
          firebaseUser={isSingIn}
          dataUser={dataUser}
        />
      ),
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
      path: "/edit-libros/:libroId",
      element: <EditarLibro />,
    },
  ];
  return (
    <BrowserRouter>
      <div className="head col-12">
        <CompNavbar
          peliculaList={listPeliculas}
          isSingIn={isSingIn}
          setIsSingIn={setIsSingIn}
          setListPeliculasFilter={setListPeliculasFilter}
          dataUser={dataUser}
        />
      </div>
      <Routes>
        {routes.map((screen) => (
          <Route
            key={screen.path}
            path={screen.path}
            element={screen.element}
          />
        ))}
        {dataUser.admin && (
          <>
            <Route path="/register-book" element={<RegisterBook />} />
            <Route path="/eliminar-book" element={<EliminarLibros />} />
          </>
        )}
        {
          /* 
        agrega una vista para las controlar las rutas inexistente como un error 404 page not found
        <Route path="*" element={<EliminarLibros />} /> 
        */
          <Route path="*" Component={NoteFound} />
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
