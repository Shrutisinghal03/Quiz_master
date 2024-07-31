import express from 'express';
import {login, logout,forgotpassword, verifyOtpandResetPassword, changePasswrd, getMyQuizResult, getStudentHistory, getMyHistory, getUser} from "../controllers/Admin.controllers.js"
import { sendotp } from '../controllers/Otp.controllers.js';
import authuser from '../middlewares/auth.middleware.js';
import { getAllStudent } from '../controllers/SuperAdmin.controllers.js';
import { getAllQuizzes, getAuthorQuiz, publishQuiz } from '../controllers/quizCreator.js';
const router =express.Router();
router.post("/login", login); 
router.post("/forgotPassword",  forgotpassword); 
router.post("/changePassword",authuser, changePasswrd); 
router.post("/verifyOtpChangePassword", verifyOtpandResetPassword); 
router.get("/logout",authuser,logout)
router.get("/getAllStudents",authuser, getAllStudent); 
router.get("/getMyQuizPerformance/:quizId",authuser,getMyQuizResult);
router.post("/getStudentHistory",authuser,getStudentHistory); 
router.get("/getmyhistory",authuser,getMyHistory); 
router.get("/PublishQuiz/:id",authuser,publishQuiz); 
router.get("/viewAllQuizzess",authuser, getAllQuizzes); 
router.get("/:id",authuser, getUser); 
router.get("/MentorQuiz/:id",authuser, getAuthorQuiz); 
export default router; 