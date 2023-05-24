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
import React from "react";

const CompList = ({ title, autor }) => {
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: "white",
  }));
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
              <ListItem
                secondaryAction={
                  <>
                    <IconButton edge="end" aria-label="delete">
                      <ModeEditOutlineRoundedIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={title} secondary={autor} />
              </ListItem>
            </List>
          </Demo>
        </Grid>
      </Box>
    </div>
  );
};

export default CompList;
