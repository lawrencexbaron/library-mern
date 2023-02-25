const express = require("express");
const router = express.Router();
const Book = require("../model/Book");

// Get Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.json({ message: err });
  }
};

// Get Book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    res.json(book);
  } catch (err) {
    res.json({ message: err });
  }
};

// Create Book
const createBook = async (req, res) => {
  const { title, author, pages, genre, price, publisher } = req.body;

  const book = new Book({
    title,
    author,
    pages,
    genre,
    price,
    publisher,
  });

  try {
    const savedBook = await book.save();
    res.json(savedBook);
  } catch (err) {
    res.json({ message: err });
  }
};

// Update Book
const updateBook = async (req, res) => {
  const { title, author, pages, genre, price, publisher } = req.body;

  try {
    const updatedBook = await Book.updateOne(
      { _id: req.params.bookId },
      {
        $set: {
          title,
          author,
          pages,
          genre,
          price,
          publisher,
        },
      }
    );
    res.json(updatedBook);
  } catch (err) {
    res.json({ message: err });
  }
};

// Delete Book

const deleteBook = async (req, res) => {
  try {
    const removedBook = await Book.remove({ _id: req.params.bookId });
    res.json(removedBook);
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
