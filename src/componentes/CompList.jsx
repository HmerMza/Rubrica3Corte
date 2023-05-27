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
import { firebase } from "../data/firebase";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const CompList = () => {
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: "white",
  }));
  //Traigo la Base de Datos
  const [listPeliculas, setListPeliculas] = useState([]);
  const [deletedItemId, setDeletedItemId] = useState(null);
  useEffect(() => {
    const getBooks = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("libro").get();
        const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setListPeliculas(result);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);
  //elimino el elemento
  useEffect(() => {
    const deleteItem = async () => {
      if (deletedItemId) {
        try {
          const db = firebase.firestore();
          await db.collection("libro").doc(deletedItemId).delete();
          setDeletedItemId(null);
          // Actualizar la lista de películas después de eliminar
          const updatedList = listPeliculas.filter(
            (item) => item.id !== deletedItemId
          );
          setListPeliculas(updatedList);
          swal({
            title: "Eliminar Libro",
            text: "El libro fue eliminado exitosamente",
            icon: "success",
            button: "Aceptar",
          });
          history("/Eliminar-Book");
        } catch (error) {
          console.log(error);
        }
      }
    };
    deleteItem();
  }, [deletedItemId]);
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
                      <IconButton edge="end" aria-label="editar">
                        <ModeEditOutlineRoundedIcon />
                      </IconButton>
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
