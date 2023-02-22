const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
// const dotenv = require('envdot')
// const pool = require('./db');
const port = 5001;
app.use(cors());

// const jsonData = require('./pokedex.json');

const mongoose = require('mongoose');
const ResultPoke = require("./model/ResultPoke");
require("dotenv").config({ path: ".env" });

mongoose.connect(process.env.MONGO_URL,{
  user:process.env.MONGO_USER,
  pass:process.env.MONGO_PASS,
});

mongoose.connection.on("connected", ()=>{
  console.log("connected to mongoDB")
})
// connection.once /? on ?
mongoose.connection.on("error", ()=>{
  console.log("err")
})


app.get("/", (req, res) => {
  res.send('hello pokemon')
})

app.get("/pokemon", (req, res) => {
  try {
    const dataJson = fs.readFileSync("./pokedex.json", "utf-8");
    const pokeApi = JSON.parse(dataJson);

    res.send(pokeApi);

  } catch (error) {
    console.error(error.message);
  }

});

// app.get('/pokemon', (req, res)=>{
//   res.send(jsonData)
// })

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
// app.use(express.json());

app.get("/pokemon/:id/:info", (req, res) => {
  try {
    
    const dataJson = fs.readFileSync("./pokedex.json", "utf-8");
    const pokeApi = JSON.parse(dataJson);
    const { id } = req.params;
    const { info } = req.params;
    
    // res.send(pokeApi[info]);
    res.send(pokeApi[id][info]);

  } catch (error) {
    console.error(error.message);
  }

});

// app.use('/routername', game/saverouter); <- Router라는 폴더를 만들고 그 안에 파일을 따로 user.js/ or save.js 따로 설정했을때.. ?

app.get("/pokefightResult", (req, res) => {
  try {
    const dataJson = fs.readFileSync("./pokedex.json", "utf-8");
    const pokeApi = JSON.parse(dataJson);

    res.send(pokeApi);

  } catch (error) {
    console.error(error.message);
  }

});

// app.post("/pokefightresult", async (req, res) => {
//   await pokefight.create({
//     name:req.body.winner
//   });
//   res.send("game result saved to database!!");
// });

app.post("/game/pokefightresult",(req, res)=>{
  pokefight.create({ name:req.body.winner})
  .then(function(){
    res.json('game result saved to database!')
  })
  .catch(err => {
    console.log(err)
    res.status(500)
    res.json(err.message)
  })
})

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

app.listen(process.env.PORT ?? port, () => {
  console.log(`${port} connected!`);
});


// module.exports = app;