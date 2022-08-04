const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
// const pool = require('./db');
const port = 5001;
// const jsonData = require('./pokedex.json');

app.use(cors());

// app.use(express.json());
app.get("/pokemon", (req, res) => {
  try {
    const dataJson = fs.readFileSync("./pokedex.json", "utf-8");
    const pokeApi = JSON.parse(dataJson);

    res.send(pokeApi);

  } catch (error) {
    console.error(error.message);
  }

});

app.get("/pokemon/:id", (req, res) => {
  try {
    
    const dataJson = fs.readFileSync("./pokedex.json", "utf-8");
    const pokeApi = JSON.parse(dataJson);
    const { id } = req.params;

    if(id <= 0){
      id = 1;
    } 
    res.send(pokeApi[id-1]);

  } catch (error) {
    console.error(error.message);
  }

});

// app.get('/pokemon/:id', function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for all origins!'})
//   })

// app.get("/pokemon/:id/:info", (req, res) => {
//   try {
//     const dataJson = fs.readFileSync("./pokedex.json", "utf-8");
//     const pokeApi = JSON.parse(dataJson);
//     let { id } = req.params;

//     if(id <= 0){
//       id = 1;
//     } 
//     res.send(pokeApi[id-1]);

//   } catch (error) {
//     console.error(error.message);
//   }

// });

app.listen(port, () => {
  console.log(port + " connected!");
});
