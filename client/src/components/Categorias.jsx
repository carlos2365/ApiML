import React from "react";
import IconButton from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Categorias({ resultado, nueva, usado, prueba }) {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#FBF159",
      },
    },
    fab: {
      margin: 0,
      top: "auto",
      left: 20,
      bottom: 20,
      right: "auto",
      position: "fixed",
    },
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (resultado) {
    return (
      <div className={classes.root} position="static">
      
        <ThemeProvider theme={theme}>
          <IconButton
            position="static"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Menu
          </IconButton>
          <Menu
            id="simple-menu"
            position="static"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => nueva("new")}>New</MenuItem>
            <MenuItem onClick={() => usado("used")}>Used</MenuItem>
            <MenuItem onClick={prueba}>Sort By Price</MenuItem>
          </Menu>
        </ThemeProvider>
      </div>
    );
  } else {
    return (
      <div>
        <h6>...</h6>
      </div>
    );
  }
}
