import mongoose from "mongoose"


const connectDB = async() => {
    // todo :-> check mongodb connection url 
    try {
        const mongoUrl = process.env.MONGO_URL
        if (!mongoUrl) {
            throw new Error("MONGO_URL is not defined")
        }
        await mongoose.connect(mongoUrl)
        console.log("MongoDB connected")
    } catch (error) {
        console.error("MongoDB connection error",error) ; 
        process.exit(1) ; 
    }
}


export default connectDB ; 