import express from 'express'  
import mongoose from 'mongoose';
import cors from 'cors'
import expenseRoute from './routes/expenseroutes.js'
import authRoute from './routes/authroutes.js'


const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/expense", expenseRoute)
app.use("/api/auth", authRoute )


// DB Connection
const connectMongo = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/ExpenseTracker")
        console.log("Connected to Database");
    }
    catch(err){
        throw err;
    }
}

app.listen(5000, ()=>{
    connectMongo();
    console.log("Connected to Backend");
})


