
const EventEmitter = require('events') ; 

class ChatRoom extends EventEmitter{

    constructor(){
        super() ; 

        this.users = new Set() ; 
    }


    join(user){
        this.users.add(user) ; 
        this.emit('join',user) // in large scale application
        //  this events is written in different file 
        // and then take context from there  when needed 
    }
    sendMessage(user,message){
        if(this.users.has(user)){
            this.emit('message',user,message);
        }else{
            console.log(`${user}is not in chat`)
        }
    }


    leave(user){
        if(this.users.has(user)){
            this.users.delete(user) ;
            this.emit('leave',user) ;
        }else{
            console.log(`${user} is not in the chat`)
        }
    }
}


module.exports = ChatRoom  ;