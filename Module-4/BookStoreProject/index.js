const express = require("express");

const app = express();
const PORT = 8000;

// in memory db
const Books = [
  { id: 1, title: "Title-1", author: "Author-1" },
  { id: 2, title: "Title-2", author: "Author-2" },
  { id: 3, title: "Title-3", author: "Author-3" },
  { id: 4, title: "Title-4", author: "Author-4" },
  { id: 5, title: "Title-5", author: "Author-5" },
  { id: 6, title: "Title-6", author: "Author-6" },
  { id: 7, title: "Title-7", author: "Author-7" },
  { id: 8, title: "Title-8", author: "Author-8" },
  { id: 9, title: "Title-9", author: "Author-9" },
  { id: 10, title: "Title-10", author: "Author-10" },
  { id: 11, title: "Title-11", author: "Author-11" },
];


app.use(express.json()) // middleware (Pluggins)

app.get("/", (req, res) => {
  res.end("Homepage");
});

app.get('/api/books',(req,res)=>{
    res.setHeader('x-uthor','shubham rohilla') ; 
    return res.status(200).json({Books}); 
})

app.get('/api/books/:id',(req,res)=>{
    const id = parseInt(req.params.id) ; // instead of this we can also do 
    const book = Books.find(e => e.id === id) ; // e.id == id // dont strict check

    if(isNaN(id)){
        return res.status(400).json({error : "id must be a number"}) ;
    }

    if(!book){
        return res.status(404).json({error : `Book with ${id} is not exists`}) ; 
    }
     return res.status(202).json(book) ; 
})

app.post('/api/books',(req,res)=>{
    const{title,author}  = req.body ; 

    if(!title || title === '') return res.status(400).json({error:"title is required"}) ;

    
    if(!author || author === '') return res.status(400).json({error:"author is required"}) ;

    const id = Books.length ; 
    const book = {id, title , author} ; 

    Books.push(book) ; 

    return res.status(201).json({message : "Book is created added to database",id})

})
app.delete('/api/books/:id',(req,res)=>{
    const id = parseInt(req.params.id) ; 

    if(isNaN(id)) return res.status(400).json({error: `id must be of type number your id is ${id}`}) ; 

    const idToDelete = Books.find(e => e.id === id) ; 



    if(!idToDelete) return res.status(404).json({error :`Book with ${id} does not exists`}) ; 

    Books.slice(idToDelete,1) ; 

    return res.status(200).json({message:"book deleted"}) ; 



})
app.listen(PORT, (req, res) => {
  console.log(`Server is running sucessfully on port${PORT}`);
});
