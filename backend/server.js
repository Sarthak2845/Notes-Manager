const express=require("express");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes");
const notesRoutes=require("./routes/notesRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require('dotenv').config();
const app=express();
connectDB();
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173", 
  credentials: true, 
}));
app.use(express.json());
app.use(cookieParser()); 
app.use('/api/auth',authRoutes);
app.use('/api', notesRoutes);
app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})