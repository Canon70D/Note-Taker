const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  deleteFromFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      //creat an id a note
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");

    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

//Delete seleted note
notes.delete("/:id", (req, res) => {
  deleteFromFile(req.params.id, "./db/db.json");

  res.json(`Note deleted successfully 🚀`);
});

module.exports = notes;
