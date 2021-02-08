import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import ProductoCard from "./ProductCard.jsx";
import Categorias from "./Categorias.jsx";
import swal from "sweetalert";

export default function Products({ resultado, query }) {
  const [listaDeProductos, setlistaDeProductos] = useState([]);
  const [ordenarMayorMenor, setOrdenarMayorMenor] = useState([]);
  const [swicht, setSwicht] = useState(true);

  function prueba() {
    if (swicht) {
      setSwicht(false);
      setOrdenarMayorMenor(resultado.reverse());
      return swicht;
    } else {
      setSwicht(true);
      return swicht;
    }
  }

  function nueva() {
    setlistaDeProductos([]);
    var arrayNew = [];
    for (let index = 0; index < resultado.length; index++) {
      if (resultado[index].condition === "new") {
        arrayNew.push(resultado[index]);
        setlistaDeProductos(arrayNew);
      }
    }
    if (arrayNew.length === 0) {
      swal("there are no articles");
    }
  }
  function usado() {
    setlistaDeProductos([]);
    var arrayUsado = [];
    for (let index = 0; index < resultado.length; index++) {
      if (resultado[index].condition === "used") {
        arrayUsado.push(resultado[index]);
        setlistaDeProductos(arrayUsado);
      }
    }
    if (arrayUsado.length === 0) {
      swal("there are no articles");
    }
  }

  function otros() {
    setlistaDeProductos([]);
    var arrayOtros = [];
    for (let index = 0; index < resultado.length; index++) {
      if (resultado[index].condition === "not_specified") {
        arrayOtros.push(resultado[index]);
        setlistaDeProductos(arrayOtros);
      }
    }
    if (arrayOtros.length === 0) {
      swal("there are no articles");
    }
  }

  useEffect(() => {
    setlistaDeProductos(resultado);
  }, [resultado]);

  if (resultado) {
    return (
      <div>
        <Categorias
          resultado={resultado}
          nueva={nueva}
          usado={usado}
          otros={otros}
          prueba={prueba}
        />
        <Grid container justify="center">
          {listaDeProductos && swicht ? (
            listaDeProductos.map((e) => (
              <Grid item md={4} key={e.id}>
                <ProductoCard
                  id={e.id}
                  title={e.title}
                  price={e.price}
                  thumbnail={e.thumbnail.replace("I.jpg", "A.jpg")}
                  sold_quantity={e.sold_quantity}
                  condition={e.condition}
                  available_quantity={e.available_quantity}
                  query={query}
                />
              </Grid>
            ))
          ) : listaDeProductos && swicht === false ? (
            listaDeProductos.map((e) => (
              <Grid item md={4} key={e.id}>
                <ProductoCard
                  id={e.id}
                  title={e.title}
                  price={e.price}
                  thumbnail={e.thumbnail.replace("I.jpg", "B.jpg")}
                  sold_quantity={e.sold_quantity}
                  condition={e.condition}
                  available_quantity={e.available_quantity}
                  query={query}
                />
              </Grid>
            ))
          ) : (
            <div>...</div>
          )}
        </Grid>
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
