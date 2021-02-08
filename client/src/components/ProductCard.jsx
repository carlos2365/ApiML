import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
} from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import { yellow } from "@material-ui/core/colors";
import CardActionArea from "@material-ui/core/CardActionArea";
import Modal from "react-modal";
import "../Estilos/ProductoCard.css";
import "./Products";

const theme = createMuiTheme();

theme.typography.h6 = {
  fontSize: "1.2rem",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: yellow[600],
  },

  button: {
    margin: theme.spacing(2),
  },
  modal: {
    position: "absolute",
    width: 410,
    background: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3, 4),
    top: "50%",
    left: "30%",
    transform: "translate(-50, -50)",
  },
}));

export default function ProductCard({
  title,
  price,
  thumbnail,
  available_quantity,
  sold_quantity,
  condition,
}) {
  const cadena = condition.toUpperCase();
  const classes = useStyles();
  const [IsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="container">
        <Container>
          <CardActionArea>
            <Card className={classes.root} onClick={openModal}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    H
                  </Avatar>
                }
                title={cadena}
              />
              <CardMedia
                className={classes.media}
                image={thumbnail}
                title="Imagen"
              />
              <CardContent>
                <ThemeProvider theme={theme}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {title}
                  </Typography>

                  <Typography variant="body2" color="textPrimary" component="p">
                    $ {price}
                  </Typography>
                  <Typography variant="body2" color="textPrimary" component="p">
                    Stock: {available_quantity}
                  </Typography>
                </ThemeProvider>
              </CardContent>
            </Card>
          </CardActionArea>
        </Container>
      </div>
      <div>
        <Modal
          className={classes.modal}
          isOpen={IsOpen}
          onRequestClose={closeModal}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="body2" color="textPrimary" component="p">
              Ref: {title}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              Stock: {available_quantity}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              Article: {condition}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              Sold: {sold_quantity}
            </Typography>
          </ThemeProvider>
        </Modal>
      </div>
    </div>
  );
}
