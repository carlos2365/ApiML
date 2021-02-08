const express = require("express");
const server = express();
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
const redis = require("redis");


const redisClient = redis.createClient(6379);

server.use(morgan("dev")); //
server.use(cors());



server.get("/api/search",  cache, getAppi);

async function getAppi(req, res, next){
  const searchTerm = req.query.q;
  
  try {
    

    const jobs = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchTerm}`);
    const data = await jobs.json();
    console.log("prueba")
    res.status(200).send(data);
    
    
  } catch(error) {
    console.log(error);
    res.status(500).json({ error: error})
  }
  
};

function cache(req,res, next) {
  const searchTerm = req.query.q;
  console.log("prueba2")
  redisClient.get(searchTerm, (error, cachedData) => {
    if (error) throw error;
    if (cachedData !=null) {
      res.send(searchTerm, cachedData);

    } else {
      next();
    }

  })

};


server.listen(3001, () => {
  console.log("Servidor corriendo en 3001 ");
});

module.exports = server;
