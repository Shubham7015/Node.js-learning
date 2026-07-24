import express from "express" ;

const app = express() ; 
app.use(express.json())

const PORT = 8000; 

const DIARY = {} ;
const EMAILS = new Set()  ; // should be unique

app.get('/',(req,res)=>{
    return res.status(200).json({message: `Server is Running on ${PORT} Successfully`})
})

app.post('/signup',(req,res)=>{
    // take all the required field from client 
    const {name,email,password} = req.body  ;

    if(!name || !email || !password) return res.status(400).json({error :"All fields are required"}) ;

    if(EMAILS.has(email)) return res.status(400).json({error : "Email already taken"}) ; 

    const token = `${Date.now()}` ; 
    DIARY[token] = {name,email,password} ; 
    EMAILS.add(email)  ;

    return res.status(200).json({status : "Success",token}) ; 
})

app.post('/me',(req,res)=>{
    const{token} = req.body ; 

    if(!token) return res.status(400).json({error:"Token is Required"}) ; 

    if(!(token in DIARY)) return res.status(400).json({error : "Invalid Token"}) ; 

    const data = DIARY[token] ; 

    return res.status(200).json({Data : data}) ; 
    
})

app.post('/private-data',(req,res)=>{
    const{token} = req.body ; 

    if(!token) return res.status(400).json({error:"Token is Required"}) ; 

    if(!(token in DIARY)) return res.status(400).json({error : "Invalid Token"}) ; 

    const data = DIARY[token] ; 

    return res.status(200).json({data: {privateData: 'Access Granted'}}) ; 
    
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is Running on ${PORT} Successfully`) ; 
})