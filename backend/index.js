// index.js, Initiate the express server
import express, { request, response } from "express";
import { PORT, mongoDBUrl } from "./config.js"; //import PORT from config.js
import mongoose from "mongoose"; //import mongoose
import { Book } from "./models/bookModels.js"; //import Book model

//create an instance of express
const app = express();

//middleware to parse the request body as JSON
app.use(express.json());

//create a route, which is a function that takes a request and a response
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello World, welcome to MERN stack");
});

//post request to create a new book
app.post("/books", async (req, res) => {
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
    response.status(500).send("Internal server error");
  }
});

// route tp get all books from the database
app.get("/books", async (req, res) => {
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
    response.status(500).send("Internal server error");
  }
});

// route tp get one book from the database by id
app.get("/books/:id", async (req, res) => {
  try {
    //get the book id from the request parameters
    const { id } = req.params;

    //find the book by id in the database
    const book = await Book.findById(id);

    //return the books as a response to the client with book count and books
    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send("Internal server error");
  }
});

//connect to MongoDB, then listen to the port
mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("Connected to MongoDB");
    //only when connect to mongo, function to listen to the port
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
    console.log(error);
  });
