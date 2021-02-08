import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import Typography from '@material-ui/core/Typography';
import SearchBar from "./components/SearchBar.jsx";
import Products from "./components/Products.jsx";
import "./Estilos/App.css";


export default function App() {

  // React Hooks
  const [products, setProducts] = useState([]);
  const [ini, setIni] = useState(1);
  const [page, setPage] = useState(1);
  const [cont, setCont] = useState(1);
  const [query, setQuery] = useState("");

  const lim = 30;

  const onSearch = (queryF) => {
    setQuery(queryF);
    fetch(`http://localhost:3001/api/search?q=${queryF}`)
      .then((res) => res.json())
      .then((data) => {
        setCont(Math.ceil(data.results.length / lim));
        setProducts(data.results.slice(ini, ini + lim));
      })
      
      .catch((error) => {
        console.error(error);
      });
  };

  const ascDesc = products.sort((v1, v2) => {
    return v1.price - v2.price;
  });

  const handleChange = (e, value) => {
    var select = value * lim;
    setPage(value);
    if (select >= 50) {
      select = 0;
    }
    setIni(select);
    onSearch(query);
  };

  useEffect(() => {
    onSearch("MLA");
    
  }, []);

  return (
    <div position="static">
      <Router>
        <Route path="/" render={() => <SearchBar onSearch={onSearch} />}/>
        <Typography gutterBottom>Page: {page}</Typography>
        <Pagination count={cont} page={page} onChange={handleChange} />
        <Route path="/" render={() => <Products resultado={ascDesc} />} /> 
        
         
      </Router>
    </div>
  );
}
