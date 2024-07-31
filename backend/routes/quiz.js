import express from 'express';
import { createQuiz, deleteQuiz, getAllQuizzes, getMyQuizzes, getQuizById, publishQuiz, updateQuiz } from '../controllers/quizCreator.js';
const router =express.Router(); 
router.post("/create",createQuiz);
router.delete("/delete/:id",deleteQuiz);
router.get("/getQuiz/:id",getQuizById);
router.get("/getMyQuiz",getMyQuizzes);
router.get("/getAllQuizzes",getAllQuizzes);
router.put("/publishQuiz", publishQuiz);
router.put("/update",updateQuiz)


export default router; 