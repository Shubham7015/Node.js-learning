// Import the built-in HTTP module
const http = require("node:http");
const fs = require('node:fs') ; 

// Create the HTTP server and handle incoming requests
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const log = `\n[${Date.now()}] : ${method} ${url}`  ;
  fs.appendFileSync('log.txt',log ,'utf-8')

  // Route requests based on HTTP method and URL path
  switch (method) {
    case "GET": {
      switch (url) {
        case "/":
          // Home route
          return res.writeHead(200).end("Hi from server 8000");
        case "/contact-us":
          // Contact information route
          return res
            .writeHead(200)
            .end("Email:shubham@gmail.com , Phone:+91999999999");
        case "/tweet":
          // Return sample tweets
          return res
            .writeHead(200)
            .end('Tweet1 : Hi hello Ram Ram\nTweet2 : Ram Ram ji');
      }
      break;
    }
    case "POST": {
      switch (url) {
        case "/tweet":
          // Create a new tweet
          return res
            .writeHead(201)
            .end("Tweet is created in Databse Successfully");
      }
      break;
    }
  }

  // Fallback for unsupported routes or methods
  return res.writeHead(404).end("You are Lost");
});

// Start listening on port 8000
server.listen(8000, () => {
  console.log(`Server is running on Pot 8000 Successfully`);
});
