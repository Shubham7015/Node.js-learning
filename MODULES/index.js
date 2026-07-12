// const addfunction = require('./functions') // all the exports from './functions' file 
// console.log(addfunction) ; // all functions
// console.log(addfunction.add(1,2))  ; // according to logic in  add function in functions file

// console.log(addfunction.sub(1,2))  ;//according to logic in  sub function in functions file

// console.log(addfunction.mul(1,2))  ;//according to logic in  mul function in functions file

// console.log(addfunction.div(1,2))  ;//according to logic in  div function in functions file

// const{add,sub,mul,div} = require('./functions')// -> require(<path of file where it  present >)
// console.log(add(1,2)) ; 

const value = require('./functions') ;  // deafult exports // one file can only have 1 default exports
value(); 