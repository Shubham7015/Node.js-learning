const fs = require('fs') ;

// read the particular file 
//fs.readFileSync(path, options);

// //path: A string representing the path to the file you want to read. This can be a relative or absolute path.​
// options (optional): An object or string that specifies the encoding and flag. If not provided, it defaults to null for encoding (returning a buffer) and 'r' for the flag (open for reading).
// Return Value:

// Returns the content of the file. If no encoding is specified, it returns a Buffer object; otherwise, it returns a string.
const content = fs.readFileSync('notes.txt',{encoding: 'utf-8' ,flag: 'r'}) ;
 

// to create new file
fs.writeFileSync('copy.txt','new filw created ' ,'utf-8') ; 
// or we can also do like this  
fs.writeFileSync('copy.txt',content,'utf-8') ; 

// problem is it always overwrite the content 

fs.appendFileSync('copy.txt',content,'utf-8') ;  // it append the content to file 
fs.appendFileSync('copy.txt',"content\n",'utf-8') ;


fs.mkdirSync('games/cricket/players/batsmen/viratKholi',{recursive:true}) ; // make a directory and recursive for making folders inside that like we pass 
fs.rmdirSync('games',{recursive:true}) ; 

fs.unlinkSync('copy.txt') ; 
