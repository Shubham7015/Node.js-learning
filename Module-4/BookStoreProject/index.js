const express = require("express");
const fs = require("node:fs");

const bookRouter = require("./routes/book.routes");
const { loggermiddleware } = require("./middlewares/logger");

const app = express();
const PORT = 8000;

app.use(express.json()); // middleware (Pluggins)

// app.use(function (req, res, next) {
//   console.log("manually created middleware A");
//   // if want to return from here
//   // return res.json({message:"Not Authorized to access"}) ;
//   next(); // go to next middleware if present or route
// });
// app.use(function (req, res, next) {
//   console.log("manually created middleware B");
//   // if want to return from here
//   return res.json({ message: "Not Authorized to access after middleware B" });
//   next(); // go to next middleware if present or route
// });
//

// middleware for partiular route
// app.use('/books',(req,res,next)=>{}) // run for every request(PUT,POST,PATCH or any request on /boooks route) ;

app.get("/", (req, res) => {
  console.dir(res.app.get("view engine"));
  console.dir(res.app === req.app);
  res.end("Homepage");
});

app.use("/api/books", bookRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server is running sucessfully on port${PORT}`);
});
