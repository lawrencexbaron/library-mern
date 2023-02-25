const express = require("express");
const router = express.Router();

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

// Get Books
router.get("/", getBooks);

// Get Book by ID
router.get("/:bookId", getBookById);

// Create Book
router.post("/", createBook);

// Update Book
router.patch("/:bookId", updateBook);

// Delete Book
router.delete("/:bookId", deleteBook);

module.exports = router;
