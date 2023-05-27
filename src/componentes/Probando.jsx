import React from "react";
import { Card, CardMedia, Grid } from "@mui/material";
const Probando = () => {
  return (
    <div className="mt-5">
      {" "}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        width="80%"
        margin="auto"
        marginBottom="5%"
      >
        <Grid item xs={12} ms={6} md={6} xl={6} lg={6}>
          <Card>
            <CardMedia
              component="img"
              image="https://i.ibb.co/ByBtHV6/Mision.png"
            ></CardMedia>
          </Card>
        </Grid>
        <Grid item xs={12} ms={6} md={6} xl={6} lg={6}>
          <Card>
            <CardMedia
              component="img"
              image="https://i.ibb.co/TggHBjp/Vision.png"
            ></CardMedia>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Probando;
