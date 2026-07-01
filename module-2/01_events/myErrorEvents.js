const EventEmitter = require('events') ;

const eventEmitter = new EventEmitter() ; 


eventEmitter.on('error',(err)=>{
    console.error(`Error Occured : ${err.message}`)
})


eventEmitter.emit('error',new Error('somethin went wrong')) ;