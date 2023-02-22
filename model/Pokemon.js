const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  id:Number,
  name:{
    english:String, 
    japanese: String,
    chinese:String,
    french:String
  },
  type:[String],
  base:{
    HP: Number,
    Attack: Number,
    Defense: Number,
    "Sp. Attack": Number,
    "Sp. Defense": Number,
    Speed: Number
  }
  // bestFriend: mongoose.SchemaTypes.ObjectId
})

module.exports=mongoose.model("Pokemon", pokemonSchema);