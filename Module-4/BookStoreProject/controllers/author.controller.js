const { eq, ilike } = require("drizzle-orm");
const authorsTable = require("../models/author.model.js");
const booksTable = require("../models/book.model.js");
const db = require("../db/index.js");

exports.getAllAuthors = async (req, res) => {
  const authors = await db.select().from(authorsTable);
  if (!authors) {
    return res.status(404).json({ message: "There is no authors till now" });
  }
  return res.status(200).json({ authors });
};

exports.getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const [author] = await db
      .select()
      .from(authorsTable)
      .where(eq(authorsTable.id, id))
      .limit(1);
    if (!author)
      return res
        .status(404)
        .json({ error: `Author with ${id} doesn't exists` });
    return res.status(200).json({ author });
  } catch (error) {
    console.log("getAuhtorById failed", error);
    return res.status(500).json({ error: "Error while fetching authors" });
  }
};

exports.addAuthor = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    // Validate required title field before inserting.
    if (!firstName || firstName === "")
      return res.status(400).json({ error: "title is required" });
    if (!email || email === "")
      return res.status(400).json({ error: "email is required" });
    const [result] = await db
      .insert(authorsTable)
      .values({
        firstName,
        lastName,
        email,
      })
      .returning({ id: authorsTable.id });

    return res.status(201).json({
      message: `Author has been created successfully with id:${result.id}`,
    });
  } catch (error) {
    console.error(`addAuthor failed  : ${error}`);
    return res.status(500).json({ error: "failed to add author" });
  }
};

exports.getAllBooksByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(id))
      return res.status(400).json({
        error: "Invalid author ID",
      });

    const books = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.authorId, id));

    if (!books) {
      return res
        .status(404)
        .json({ error: "No books found for particular author" });
    }
    return res.status(200).json({ books });
  } catch (error) {
    console.log("getAllBooksByAuthor  failed", error);
    return res.status(500).json({ error: "failed to fetch books" });
  }
};
