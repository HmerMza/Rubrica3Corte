import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { db } from "../data/firebase";
import { useEffect, useState } from "react";

import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CompList = () => {
  const Demo = styled("div")(() => ({
    backgroundColor: "white",
  }));
  //Traigo la Base de Datos
  const [listPeliculas, setListPeliculas] = useState([]);
  const [deletedItemId, setDeletedItemId] = useState(null);
  useEffect(() => {
    const getBooks = async () => {
      try {
        await onSnapshot(collection(db, "libro"), (query) => {
          setListPeliculas(
            query.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        });
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);
  //elimino el elemento
  useEffect(() => {
    const deleteItem = async () => {
      try {
        await deleteDoc(doc(db, "libro", deletedItemId));
        setDeletedItemId(null);
        // Actualizar la lista de películas después de eliminar
        const updatedList = listPeliculas.filter(
          (item) => item.id !== deletedItemId
        );
        setListPeliculas(updatedList);
        Swal.fire({
          title: "Eliminar Libro",
          text: "El libro fue eliminado exitosamente",
          icon: "success",
          button: "Aceptar",
        });
        // history("/Eliminar-Book");
      } catch (error) {
        console.log(error);
      }
    };
    if (deletedItemId) {
      Swal.fire({
        title: "Seguro que desea eliminar el libro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteItem();
        } else {
          setDeletedItemId(null);
        }
      });
    }
  }, [deletedItemId]);

  //editar el elemento
  return (
    <div>
      <Box
        sx={{ flexGrow: 1, maxWidth: 752 }}
        style={{
          borderRadius: "25px",
          margin: "auto",
        }}
      >
        <Grid item xs={12} md={4}>
          <Demo>
            <List margin={"auto"} ma>
              {listPeliculas.map((libro, index) => (
                <ListItem
                  key={index}
                  secondaryAction={
                    <>
                      <Link to={`/edit-libros/${libro.id}`}>
                        <IconButton edge="end" aria-label="editar">
                          <ModeEditOutlineRoundedIcon />
                        </IconButton>
                      </Link>

                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => setDeletedItemId(libro.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={libro.nombre}
                    secondary={libro.autor}
                  />
                </ListItem>
              ))}
            </List>
          </Demo>
        </Grid>
      </Box>
    </div>
  );
};

export default CompList;
