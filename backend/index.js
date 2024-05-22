// index.js, Initiate the express server
import express from "express";
import { PORT, mongoDBUrl } from "./config.js"; //import PORT from config.js
import mongoose from "mongoose"; //import mongoose
import { Book } from "./models/bookModels.js"; //import Book model
import booksRoute from "./routes/booksRoute.js"; //import booksRoute

//create an instance of express
const app = express();

//middleware to parse the request body as JSON
app.use(express.json());

//create a route, which is a function that takes a request and a response
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello World, welcome to MERN stack");
});

//use the booksRoute for all routes that start with /books
app.use("/books", booksRoute);

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
