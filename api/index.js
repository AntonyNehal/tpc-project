import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';

const app=express();
app.use(express.json());;
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin only
  }));
mongoose.connect('mongodb+srv://swathy:swathy@tpc-project.w1d0i.mongodb.net/tpc-project?retryWrites=true&w=majority&appName=tpc-project').then(
    ()=>{console.log('mongodb is connected')}).catch(err=>{
        console.log(err);
    })


app.listen(3000,()=>{
    console.log('server is running on port 3000');
})
app.use('/api/user',userRoutes);
