const { eq, ilike ,sql } = require("drizzle-orm");
const booksTable = require("../models/book.model.js");
const authorsTable = require('../models/author.model.js') ; 
const db = require("../db/index.js");

// Controller to fetch all books or search books by title.
exports.getAllBooks = async (req, res) => {
  try {
    // Set a custom header for auditing or identification.
    res.setHeader("x-author", "shubham rohilla");

    // Read the optional search query parameter.
    const search = req.query.search; // ?search=node in url then it returns -> search

    if (search) {
      // Use full text search on the title field when search is provided.
      const books = await db
        .select()
        .from(booksTable)
        .where(
          sql`to_tsvector('english', ${booksTable.title}) @@ plainto_tsquery('english', ${search})`,
        );
      return res.status(200).json({ books });
    }

    // Return all books when no search term is provided.
    const books = await db.select().from(booksTable);
    console.log(search);
    return res.status(200).json({ books });
  } catch (error) {
    console.error(`getAllBooks failed : ${error}`);
    return res.status(500).json({ error: "failed to fetch books" });
  }
};

// Controller to fetch a single book by its id.
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    // Query the books table for a record matching the provided id.
    const [book] = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, id))
      .leftJoin(authorsTable,eq(booksTable.authorId,authorsTable.id)) 
      .limit(1);

    if (!book) {
      return res.status(404).json({ error: `Book with ${id} is not exists` });
    }
    return res.status(202).json(book);
  } catch (error) {
    console.error(`getBookById failed : ${error}`);
    return res.status(500).json({ error: "failed to fetch book" });
  }
};

// Controller to add a new book record.
exports.addBook = async (req, res) => {
  try {
    const { title, description, authorId } = req.body;

    // Validate required title field before inserting.
    if (!title || title === "")
      return res.status(400).json({ error: "title is required" });

    const [result] = await db
      .insert(booksTable)
      .values({
        title,
        description,
        authorId,
      })
      .returning({ id: booksTable.id });

    return res
      .status(201)
      .json({ message: `Book created successfully with id:${result.id}` });
  } catch (error) {
    console.error(`addBook failed  : ${error}`);
    return res.status(500).json({ error: "failed to add book" });
  }
};

// Controller to delete a book by its id.
exports.deleteBookById = async (req, res) => {
  const id = req.params.id;

  // Delete the record from the books table with the matching id.
  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({ message: "book deleted" });
};
