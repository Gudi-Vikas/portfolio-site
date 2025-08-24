import mongoose from 'mongoose'

export const connectDB = ()=>{
    mongoose.connect("mongodb+srv://vikasgudii:7013713@cluster0.kns1efd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>console.log("db connected")
    )
}