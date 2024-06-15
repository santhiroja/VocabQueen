const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })) ;
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/DictionaryApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("connected to db"))
  .catch(console.error);

const Dictionary = require("./model/Dictionary");

async function fetchDefinition(userInputWord) {
  try {
    const response = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + userInputWord);

    if (response.status === 200 && response.data.length > 0) {
      const specificPart = response.data[0].meanings[0].definitions[0].definition;
      console.log(`Definition of ${userInputWord} is:\n${specificPart}`);
      return specificPart;
    } else {
      console.log('Invalid response or word not found');
      return null;
    }
  } catch (error) {
    console.log("please provide a valid word");
    return null;
  }
}

app.post("/search", async (req, res) => {
  const { word } = req.body;

  try {
    const existingWord = await Dictionary.findOne({ word: word });

    if (existingWord) {
      res.json(existingWord);
    } else {
      const meaning = await fetchDefinition(word);

      if (meaning) {
        const newWord = new Dictionary({ word: word, meaning: meaning });
        await newWord.save();
        res.json(newWord);
      } else {
        res.status(404).json({ error: "Meaning not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", async (req, res) => {
  const words = await Dictionary.find();
  res.json(words);
});

app.listen(3000, () => console.log("server started running on port 3000"));
