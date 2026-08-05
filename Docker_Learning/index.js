import express from "express"



const app = express() ; 

const PORT = 8000 ; 


app.get('/',(req,res)=>{
    return res.json({"Status" :"OK" , "Message" :"Server is running successfully"}) ; 
})

app.listen(PORT,()=>{
    console.log(`Server is running successfully on PORT ${PORT}`) ;
})


