import ResponseHandler from "../middlewares/error.middleware.js";
import Quiz from "../models/quizSchema.js";
import Student from "../models/StudentSchema.js";
import Result from "../models/ResultSchema.js";
import { sendOTPEmail } from "../utils/basicfxn.js";

export const enrollStudent = async (req, res, next) => {
    const userId = req.user._id;
    const quizId = req.params.quizId;

    try {
        // Find the student by user ID
        const student = await Student.findById(userId);
        if (!student) {
            return next(new ResponseHandler("You cannot register for this", 203));
        }

        // Find the quiz by quiz ID
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return next(new ResponseHandler("Quiz not found", 204));
        }

        const isAlreadyEnrolled = quiz.enrolledUsers.some((ele) => (ele.userId.toString() === userId.toString()))
        if (isAlreadyEnrolled) {
            return next(new ResponseHandler("You are already enrolled in this quiz", 204));
        }
        // Enroll the student in the quiz
        quiz.enrolledUsers.push({ userId: userId, status: "enrolled", score: 0 });
        await quiz.save();

        // Add the quiz to the student's enrolled quizzes
        student.quizEnroll.push(quizId);
        await student.save();

        // Send success response
        return res.status(201).json({ message: "You have successfully registered for this quiz" });
    } catch (error) {
        // Handle any errors
        return next(new ResponseHandler(error.message, 500));
    }
};

export const attemptQuiz = async (req, res, next) => {
    const userId = req.user._id;
    const quizId = req.params.quizId;
    const answers = req.body; // answers should be an array of user's answers

    try {
        // Validate answers
        if (!Array.isArray(answers) || answers.length === 0) {
            return next(new ResponseHandler("Invalid answers array", 400));
        }

        // Find the student by user ID
        const student = await Student.findById(userId);
        if (!student) {
            return next(new ResponseHandler("User not found", 404));
        }

        // Find the quiz by quiz ID
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return next(new ResponseHandler("Quiz not found", 404));
        }

        // Calculate the score
        let pscore = 0;
        let correctAnswers = 0;
        let wrongAnswers = 0;

        quiz.questions.forEach((question, index) => {
            const answer = answers[index];
            if (answer && answer.answerIndex === question.correctOption) {
                pscore += question.marks;
                correctAnswers++;
            } else if (answer && answer.answerIndex !== question.correctOption) {
                pscore -= quiz.negativeMark;
                wrongAnswers++;
            }
        });

        // Determine pass/fail
        const isPass = pscore >= quiz.passingMarks;

        // Update the student's quiz attempts
        student.quizAttempt.push({ quizId, score: pscore, isPass });
        await student.save();

        // Update the quiz's enrolled user status and score
        
            quiz.enrolledUsers.push({ userId:req.user._id, status:'completed',score:pscore}); 

        // Save the result
        const result = new Result({
            studentId: userId,
            adminId: quiz.author,
            quizId,
            totalQuestions: quiz.totalQuestions,
            rightAnswers: correctAnswers,
            wrongAnswers,
            unanswered: quiz.totalQuestions - correctAnswers - wrongAnswers,
            score: pscore,
            passingMarks: quiz.passingMarks,
            isPassed: isPass,
        });

        await result.save();
        await quiz.save();

        // Send email
        sendOTPEmail(req.user.email,  `Thank you for attempting the quiz.
            Total Questions: ${quiz.totalQuestions}
            Right Answers: ${correctAnswers}
            Wrong Answers: ${wrongAnswers}
            Unanswered: ${quiz.totalQuestions - correctAnswers - wrongAnswers}
            Score: ${pscore}
            Passing Marks: ${quiz.passingMarks}`,"your Result");

        // Send success response
        return res.status(200).json({
            message: "Quiz attempted successfully",
            score: pscore,
            rightAnswers: correctAnswers,
            wrongAnswers
        });
        
    } catch (error) {
        // Handle any errors
        return next(new ResponseHandler(error.message, 500));
    }
};

export const getAllResult=async(req,res,next)=>{
    const user=req.params.id; 
    try {
         
         const results=await Result.find({studentId:user}).populate(['quizId','studentId','adminId']);   
         if(!results){
            return next(new ResponseHandler("results not found",204)); 
         }
         return res.status(200).json(results);

    } catch (error) {
         return next(new ResponseHandler("There is Some Error in fetching result",error)); 
    }
}
export const getResult=async(req,res,next)=>{
    const user=req.user; 
    const quizid=req.params.id; 
    try {
     console.log("result", user._id,quizid); 
         const results=await Result.findOne({studentId:user._id , quizId: quizid });   
         if(!results){
            return next(new ResponseHandler("results not found",204)); 
         }
         return res.status(200).json(results);

    } catch (error) {
         return next(new ResponseHandler("There is Some Error in fetching result",error)); 
    }
}