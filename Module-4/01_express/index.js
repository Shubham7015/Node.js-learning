// Import the Express framework to create the web server
const express = require("express");

// Initialize the Express application
const app = express();

// Define the port where the server will listen for requests
const PORT = 8000;

// Define a route for the root path
// Responds with a simple HomePage message and HTTP 200 status
app.get("/", (req, res) => {
  res.status(200).end("HomePage");
});

// Define a route for /contact-us
// Responds with a Contact-Page message and HTTP 200 status
app.get("/contact-us", (req, res) => {
  res.status(200).end("Contact-Page");
});

// Define a route to fetch tweets with GET
// Responds with HTTP 200 status and a message indicating data retrieval
app.get("/tweet", (req, res) => {
  res.status(200).end("Fetching Tweets from Database");
});

// Define a route to handle creating a new tweet with POST
// Responds with HTTP 201 Created status and a confirmation message
app.post("/tweet", (req, res) => {
  res.status(201).end("Posting Tweets");
});

// Start the server and listen on the defined port
// Logs a message when the server starts successfully
app.listen(PORT, () => {
  console.log(`Server is Running successfully on server ${PORT}`);
});
