import express from "express";
import { Book } from "../models/bookModels.js";
import mongoose from "mongoose";

const router = express.Router();

//post request to create a new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send("Send all required fields: title, author, publishYear");
    }
    //create a new book object, with the title, author, and publishYear from the request body
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    //create a new book in the database
    const book = await Book.create(newBook);

    //return the book object as a response to the client
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// route tp get all books from the database
router.get("/", async (req, res) => {
  try {
    //get all books from the database
    const books = await Book.find();

    //return the books as a response to the client with book count and books
    return res.status(200).send({
      count: books.length,
      books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// route tp get one book from the database by id
router.get("/:id", async (req, res) => {
  try {
    //get the book id from the request parameters
    const { id } = req.params;

    //find the book by id in the database
    const book = await Book.findById(id);

    //return the books as a response to the client with book count and books
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// router for update a book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send("Send all required fields: title, author, publishYear");
    }

    //get the book id from the request parameters
    const { id } = req.params;

    // check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid book ID");
    }

    //find the book by id in the database and update it
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send("Book not found");
    }

    return res.status(200).send("Book updated successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

// router for delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid book ID");
    }

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send("Book not found");
    }

    return res.status(200).send("Book deleted successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error, unable to delete book");
  }
});

export default router;
