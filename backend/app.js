import express from 'express';
import dotenv from 'dotenv';  
import cookieParser from 'cookie-parser';
import superAdmin from './routes/SuperAdmin.routes.js';
import student from './routes/Student.routes.js';
import admin from './routes/Admin.routes.js';
import quiz from "./routes/quiz.js"
import Profile from "./routes/Profile.routes.js"
import question from "./routes/question.routes.js"
import quizAttempt from "./routes/quizAttempt.routes.js"; 
import conn from "./database/conn.js";
import { errorMiddleware } from './middlewares/error.middleware.js';
import authuser from './middlewares/auth.middleware.js';
import cors from 'cors'; 
dotenv.config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
 app.get("/",(req,res)=>{
    res.send("heeeee"); 
 })
 app.use(
   cors({
       origin: [process.env.FRONTEND_URL], // Ensure this environment variable is set to http://localhost:5173
       methods: ["GET", "POST", "DELETE", "PUT"],
       credentials: true,
   })
);
app.options('*', cors());
app.use("/api/student/v1", student); 
app.use("/api/admin/v1", admin); 
app.use("/api/superAdmin/v1", superAdmin); 
app.use("/api/profile/v1",authuser, Profile); 
app.use("/api/quiz/v1", authuser,quiz); 
app.use("/api/question/v1", authuser,question); 
app.use("/api/quizAttempt/v1", authuser,quizAttempt); 
app.use(errorMiddleware);

export default app;