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
router.get("/:id", getBookById);

// Create Book
router.post("/", createBook);

// Update Book
router.patch("/:id", updateBook);

// Delete Book
router.delete("/:id", deleteBook);

module.exports = router;
