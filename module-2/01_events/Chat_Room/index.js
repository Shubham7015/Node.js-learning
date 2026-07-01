const ChatRoom = require('./chatRoom.js') ; 

const chat = new ChatRoom() ; 


chat.on('join',(user)=>{
    console.log(`${user} has joined the chat`) ; 
})


chat.on('message',(user,message)=>{
    console.log(`${user} has send a message : ${message}`) ; 
})


chat.on('leave',(user)=>{
    // alert(`${user} has left the chat`) ; 
    console.log(`${user} has left the chat`) ; 
})


chat.join('Shubham Rohilla') ;
chat.join('Vishal Rohilla')
// cryptography by william stalling (Book)

chat.sendMessage('Shubham Rohilla' , "Hey Shubham is here") ; 
chat.sendMessage('Vishal Rohilla','Hey Vishal is here') ; 

chat.leave('Shubham Rohilla') ; 
chat.sendMessage('Shubham Rohilla','By Everyone') ; 