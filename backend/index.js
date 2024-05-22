// Initiate the express server
import express, { response } from "express";
import { PORT } from "./config.js"; //import PORT from config.js

//create an instance of express
const app = express();

//create a route, which is a function that takes a request and a response
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello World, welcome to MERN stack");
});

//function to listen to the port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
