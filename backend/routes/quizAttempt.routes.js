import express from 'express';
import { attemptQuiz, enrollStudent } from '../controllers/StudentQuiz.controllers.js';
const router =express.Router(); 
router.get("/enrollStudent/:quizId",enrollStudent);
router.post("/attemptQuiz/:quizId",attemptQuiz); 



export default router; 