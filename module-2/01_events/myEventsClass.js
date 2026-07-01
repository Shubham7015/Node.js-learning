const EventEmitter = require("events") 

class Message extends EventEmitter {
    sendMessage(msg){
        console.log(`Message Sent: ${msg}`) ; 
        this.emit('messageRecieved',msg) ; 
    }
} ;


const message = new Message() ;

message.on("messageRecieved",(msg)=>{
    console.log(`New Message: ${msg}`) ; 
})

message.sendMessage("Shubham Rohilla") ; 