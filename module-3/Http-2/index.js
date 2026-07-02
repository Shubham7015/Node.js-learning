const http = require("node:http");

const server = http.createServer((req, res) => {
  // console.log(`Getting incoming request at time: ${Date.now().toLocaleString()}`) ;
  // console.log(req.headers) ;
  // console.log(req.method) ;
  // console.log(req.body) ;
  // console.log(req.url)

  switch (req.url) {
    case "/":
      res.writeHead(200);
      return res.end("HomePage");

    case "/contact-us":
      res.writeHead(201);
      return res.end("Contact me at Linkedin");

    case "/about":
      res.writeHead(202);
      return res.end(
        "I am Working as FullStack Devloper Intern at CAST Banglore",
      );
      
    default:
      res.writeHead(404);
      return res.end("Page is not here");
  }
  // res.end(`OK you only accepts ${req.headers['accept-language']}`) ;
});

server.listen(8000, () => {
  console.log(`Server is running on PORT 8000`);
});
