const mongoose = require('mongoose');
const pokeResultSchema = new mongoose.Schema({
  
  name: String, 
})

module.exports=mongoose.model("PokefightResult", pokeResultSchema);