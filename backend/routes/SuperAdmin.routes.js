import express from 'express';
import {Register,login, logout, forgotpassword, verifyOtpandResetPassword, changePasswrd, RegisterAdmin,getAllStudent,getAllAdmins, getAdminHistory} from "../controllers/SuperAdmin.controllers.js"
import authuser from '../middlewares/auth.middleware.js';
import { sendotp } from '../controllers/Otp.controllers.js';
import { getStudentHistory } from '../controllers/Admin.controllers.js';
import { getAllQuizzes } from '../controllers/quizCreator.js';
const router =express.Router(); 
router.post("/register",Register);
router.post("/sendotp", sendotp)
router.post("/login", login); 
router.post("/forgotPassword",forgotpassword); 
router.post("/changePassword",authuser, changePasswrd); 
router.post("/registerAdmin",authuser, RegisterAdmin); 
router.post("/verifyOtpChangePassword", verifyOtpandResetPassword); 
router.get("/logout",authuser,logout)
router.get("/getAllStudents",authuser, getAllStudent); 
router.get("/getAllAdmins",authuser, getAllAdmins);
router.post("/getStudentHistory",authuser,getStudentHistory); 
router.post("/getAdminHistory",authuser,getAdminHistory); 
router.get("/viewAllQuizzess",authuser, getAllQuizzes); 
export default router; 