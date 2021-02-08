import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";



const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Paginacion({ cont, page, handleChange }) {
  const classes = useStyles();

  
  return (
    <div className={classes.root}>
      <Pagination
        justify="center"
        alignItems="center"
        count={cont}
        variant="outlined"
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}
