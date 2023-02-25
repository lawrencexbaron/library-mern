const express = require("express");
const router = express.Router();
const Book = require("../model/Book");
const mongoose = require("mongoose");
const { bookValidation } = require("../utils/validation");

// Get Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({ data: books });
  } catch (err) {
    res.json({ data: { message: err } });
  }
};

// Get Book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ data: `No book with that ${id}` });
  }

  try {
    const book = await Book.findById(id);
    return res.status(200).json({ data: book });
  } catch (err) {
    return res.json({ message: err });
  }
};

// Create Book
const createBook = async (req, res) => {
  const { title, author, pages, genre, price, publisher } = req.body;

  // Validate data
  const { error } = bookValidation(req.body);
  if (error) {
    const messages = error.details.map((el) => el.message);
    return res.status(400).json({ data: messages });
  }

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
    res.status(201).json({ data: savedBook });
  } catch (err) {
    res.json({ message: err });
  }
};

// Update Book
const updateBook = async (req, res) => {
  const { title, author, pages, genre, price, publisher } = req.body;

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ data: `No book with that ${id}` });
  }

  // Validate data
  const { error } = bookValidation(req.body);
  if (error) {
    const messages = error.details.map((el) => el.message);
    return res.status(400).json({ data: messages });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      { _id: id },
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
    const newUpdated = await Book.findById(id);

    res.status(201).json({ data: newUpdated });
  } catch (err) {
    res.json({ message: err });
  }
};

// Delete Book

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ data: `No book with that ${id}` });
  }

  try {
    await Book.findByIdAndRemove(id);
    res.status(200).json({ data: "Book deleted successfully" });
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
