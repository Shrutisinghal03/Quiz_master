import express from 'express';
import { addMultipleQuestions, deleteque, getque, updateQuestion } from '../controllers/question.controllers.js';
const router =express.Router(); 
router.post("/addQuestion/:id", addMultipleQuestions);
router.delete("/deleteQuestion/:quizId/:queId",deleteque);
router.put("/updatequestion/:quizId/:queId",updateQuestion);
router.get("/getquestion/:id",getque);

export default router; 