const express = require('express') ;
const {BOOKS} = require('../db/book')
const router = express.Router() ; 

router.get("/", (req, res) => {
  res.setHeader("x-uthor", "shubham rohilla");
  return res.status(200).json({ BOOKS });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id); // instead of this we can also do
  const book = BOOKS.find((e) => e.id === id); // e.id == id // dont strict check

  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }

  if (!book) {
    return res.status(404).json({ error: `Book with ${id} is not exists` });
  }
  return res.status(202).json(book);
});

router.post("/", (req, res) => {
  const { title, author } = req.body;

  if (!title || title === "")
    return res.status(400).json({ error: "title is required" });

  if (!author || author === "")
    return res.status(400).json({ error: "author is required" });

  const id = BOOKS.length;
  const book = { id, title, author };

  BOOKS.push(book); //can perform database operation

  return res
    .status(201)
    .json({ message: "Book is created added to database", id });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id))
    return res
      .status(400)
      .json({ error: `id must be of type number your id is ${id}` });

  const idToDelete = BOOKS.find((e) => e.id === id);

  if (!idToDelete)
    return res.status(404).json({ error: `Book with ${id} does not exists` });

  BOOKS.slice(idToDelete, 1);

  return res.status(200).json({ message: "book deleted" });
});

module.exports = router ; 