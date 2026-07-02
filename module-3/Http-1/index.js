const http = require("http") ; 

// console.log(http.createServer())  ;

const server = http.createServer(function(req,res){
    console.log(`Got an incoming request`) ; 
    // can perform DB operations here 
    res.writeHead(200,{'Content-Type':'application/json'}) ;
    res.end(`You made a basic server`)  ;
}) ;

// make the server listen on 8000 port 
// if server is running fine than it will give us clg(statement)or logic  but it is optional here 
server.listen(8000,function(){
    console.log(`Http server is running on port 8000`) ;
})

