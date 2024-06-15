const mongoose=require("mongoose");
const Schema=mongoose.Schema;
//creating a schema basically structure of the database
const DictSchema=new Schema({
    word: { type: String, required: true },
    meaning: { type: String, required: true }
  });

  const Dictionary=mongoose.model("Dictionary",DictSchema);
  module.exports=Dictionary;

