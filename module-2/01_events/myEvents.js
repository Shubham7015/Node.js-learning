// importing the events module 
const EventEmitter = require("events") ; // Responsible for importing events module from node.js

// making new instance of EventEmitter 
const eventEmitter = new EventEmitter() ; 

// defining the event and attaching the listner to it 
eventEmitter.on('greet',(username)=>{
    console.log(`Hi ${username}, You are learning events in Node.js`) ; 
})

// Event which emit only once using .once() 
// example-> in a grp when user joined or left msg we want to pop a notification that user joined or left once not continuously 

eventEmitter.once('pushNotification',()=>{
    console.log("Notification Reserved") ; // This event will only run once ; 
})

// //Emit the event 
// eventEmitter.emit('greet',"Shubham") ; // we can pass arguments also (data we wanna send) can be anything string,array etc...
// // data we send can go to .on((argument)=>{work you wanna do})
// eventEmitter.emit('greet',"Vishal") ; // run
// eventEmitter.emit("pushNotification") ;  // run
// eventEmitter.emit("pushNotification") ;  // not run
// eventEmitter.emit('greet',"Vivek") // run

const myListener = () => console.log('I am Test Listner and i am different listener ') ; 
eventEmitter.on('test',myListener) ; 


eventEmitter.emit('test') ;

// removing a listner on event 

eventEmitter.removeListener('test',myListener) ;

// firing an event after deleting the listener
eventEmitter.emit('test') ;

console.log(eventEmitter); //  event emmiter object
console.log(eventEmitter.listeners('greet')) ; // return an array of listners(callback functions) which is invoking on particular event
console.log(eventEmitter.listenerCount('greet'))  ; //  return how many listners on particular event
