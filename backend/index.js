// Initiate the express server
import express, { response } from "express";
import { PORT, mongoDBUrl } from "./config.js"; //import PORT from config.js
import mongoose from "mongoose"; //import mongoose

//create an instance of express
const app = express();

//create a route, which is a function that takes a request and a response
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello World, welcome to MERN stack");
});

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
