
const fs = require('fs') ;

// Read the contents of notes.txt file 

console.log('start of the script') ; 
// sync => Blocking operations
// const content = fs.readFileSync('notes.txt','utf-8') ; 
const contents = fs.readFile('notes.txt','utf-8',function(error,data){ // [Async] => Non Blocking code
    if(error) console.log(error);
    else console.log(data) ; 
})

// console.log('Contents',content) ; 

console.log('end of the script') ; 



// [Async] => Non Blocking

