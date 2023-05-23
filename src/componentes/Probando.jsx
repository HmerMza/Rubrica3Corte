import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
const Probando = () => {
  return (
    <div style={{ my: 3 }} className=" mt-5">
      {" "}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={4}
        width="80%"
        margin="auto"
      >
        <Grid item xs={8} ms={4} md={4} xl={3} lg={4}>
          <Card>
            <CardMedia
              component="img"
              image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            ></CardMedia>
            <CardContent>
              <Typography variant="h5">{"Mision"}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} ms={4} md={4} xl={3} lg={4}>
          <Card>
            <CardMedia
              component="img"
              image="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"
            ></CardMedia>
            <CardContent>
              <Typography variant="h5">{"Vision"}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Probando;
