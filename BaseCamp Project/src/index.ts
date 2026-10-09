import dotenv from "dotenv";
import app from  "./app.js"
import connectDB from "./db/connection.js";
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({
  path: "./.env",
});


const port :number  = Number(process.env.PORT || 8000)


connectDB()
      .then(()=>{
        app.listen(port,()=>{
          console.log(`App is running on port ${port}`)
        })
      })
      .catch((err)=>{
        console.error("MongoDB connection error",err)
        process.exit(1) 
      })

