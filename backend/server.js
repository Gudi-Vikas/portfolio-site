import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import  skillRouter from "./routes/skillRoute.js"
import projectRouter from "./routes/projectRoute.js"
import messagesRouter from "./routes/messagesRoute.js"


//app config
const app = express()
const port = 4000

//middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
    
//dbconnection
connectDB()

//api end point

app.use("/api/skills",skillRouter)
app.use("/uploads",express.static("uploads"))
app.use("/api/projects",projectRouter)
app.use("/api",messagesRouter)



app.listen(port,()=>console.log("server Started at 4000"))