const {Buffer} = require('buffer') ; 

// const buf = Buffer.alloc(4) ; //<Buffer 00 00 00 00>
// console.log(buf);

// making buffer from string 
const buf = Buffer.from("Shubham") ;
// console.log(buf) ; //<Buffer 53 68 75 62 68 61 6d>
// console.log(buf.toString()) ; // Shubham 

const buf2 = Buffer.allocUnsafe(10);// tried to grab some piece of
// memory where data is not written on it but not gurantee that it 
// is unsafe because it is uninitialized memory

// console.log(buf2) ;


const buf3 = Buffer.alloc(10) ;
buf3.write('Shubham');
// console.log(buf3) ;//<Buffer 53 68 75 62 68 61 6d 00 00 00>
// console.log(buf.toString()) ; // Shubham

const buff4 = Buffer.from([1,2,3,4]) ; 
// console.log(buff4) ;//<Buffer 01 02 03 04>
// console.log(buff4.toString()) ; 

const buf5 = Buffer.from("Shubham Rohilla") ;
// console.log(buf5.toString()) ; // Shubham Rohilla
// console.log(buf5.toString('utf-8',8,15)) ; // Rohilla

// console.log(buf5.toString('base64')) ; // U2h1YmhhbSBSb2hpbGxh  
// console.log(buf5.toString('base64url')) ; // U2h1YmhhbSBSb2hpbGxh
// console.log(buf5.toString('binary')) ; /// Shubham Rohilla
// console.log(buf5.toString('hex')) ; // 5368756268616d20526f68696c6c61
// console.log(buf5.toString('latin1')) ; // Shubham Rohilla
// console.log(buf5.toString('ucs-2')) ; // 桓扵慨⁭潒楨汬
// console.log(buf5.toString('utf-16le')) ; // 桓扵慨⁭潒楨汬

const buf6 = Buffer.from('Shubham') ;
// console.log(buf6) ; //<Buffer 53 68 75 62 68 61 6d>

// for(let i = 0 ; i < buf6.length ; i++){
//     buf6[i] = 53 ; 
// }

// console.log(buf6) ;
// console.log(buf6.toString()) ;

// for(let i = 0 ; i < buf6.length ; i++){
//     buf6[i] = 0x73; // utf-8 value of s-> 0x73
//  }
// console.log(buf6) ; // <Buffer 73 73 73 73 73 73 73>
// console.log(buf6.toString()) ;//ssssss


const buf7 = Buffer.from("Shubham") ;
const buf8 = Buffer.from("Rohilla") ; 

const name = Buffer.concat([buf7,buf8]) ;
console.log(name.toString()) ;////ShubhamRohilla

console.log(name.length) ; //14