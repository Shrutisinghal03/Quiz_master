import Quiz from '../models/quizSchema.js';
import { Question } from '../models/questionSchema.js';
import ResponseHandler from '../middlewares/error.middleware.js';

export const addMultipleQuestions = async (req, res, next) => {
    const quizId = req.params.id;
    const { text,
        options,
        correctOption,
        explanation,
        marks  } = req.body;
    const user=req.user; 
    console.log(user);
    try {
        // Find the quiz by ID
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return next(new ResponseHandler('Quiz not found', 202));
        }

        if (quiz.author.toString() !== user._id.toString()) {
            return next(new ResponseHandler('You are not authorized', 203));
        }

        if (quiz.isPublished) {
            return next(new ResponseHandler('You cannot update a published quiz', 205));
        }
       
      
            const newQuestion = new Question({
                text,
                options,
                correctOption,
                explanation,
                marks,
                quizId: quiz._id, // Associate question with the quiz
            });
            const savedQuestion = await newQuestion.save();
            // Push the question's ObjectId to the quiz's questions array
            quiz.questions.push(savedQuestion._id);
            quiz.totalQuestions+=1; 
            quiz.passingMarks=( (quiz.maxMarks+marks)*35)/100; 
            quiz.maxMarks+=marks; 
            

        // Save the updated quiz with new questions
        await quiz.save();

        // Optionally, you can return the updated quiz with questions
        return res.status(200).json({ message: 'Questions added successfully', quiz });
    } catch (error) {
        return next(new ResponseHandler('Failed to add questions', error));
    }
};

export const updateQuestion = async (req, res, next) => {
    const quizId = req.params.quizId;
    const queId = req.params.queId;
    const { options ,correctOption } = req.body;
    const user = req.user;

    try {
        // Find the quiz by ID
        const quiz = await Quiz.findById(quizId);
    const question=await Question.findById(queId); 
        // Check if quiz exists
        console.log("yha ki body", req.body); 
        if (!quiz) {
            return next(new ResponseHandler('Quiz not found', 202));
        }
        if (!question) {
            return next(new ResponseHandler('Question not found', 202));
        }

        // Check if user is authorized to update questions in this quiz
        if (quiz.author.toString() !== user._id.toString()) {
            return res.status(202).json({message: 'You are not authorized'})
        }

        // Check if the quiz is published
        if (quiz.isPublished) {
            return res.status(202).json({message: 'You Cannot update a Published Quiz'})
        }

        // Find and update the question by its ID
          // Update the options of the question
          question.options = options;
          question.correctOption = correctOption;

          // Save the updated question
          const updatedQuestion = await question.save();
        return res.status(200).json({ message: 'Question updated successfully', quiz });
    } catch (error) {
        return next(new ResponseHandler('Failed to update question', error));
    }
};


export const deleteque=async(req,res,next)=>{
    const quizId=req.params.quizId; 
    const queId=req.params.queId; 
const user=req.user; 
console.log(user);
     try{
        const quiz = await Quiz.findById({_id:quizId});

        if (!quiz) {
            return next(new ResponseHandler('Quiz not found', 202));
        }

        if (quiz.author.toString() !== user._id.toString()) {
            return next(new ResponseHandler('You are not authorized', 203));
        }

        if (quiz.isPublished) {
            return next(new ResponseHandler('You cannot update a published quiz', 205));
        }
        const que = await Question.findByIdAndDelete({_id:queId});
        if (!que) {
            return next(new ResponseHandler('Question not found', 202));
        } 
        const index = quiz.questions.indexOf(queId);
        if (index === -1) {
            return next(new ResponseHandler('Question not found in quiz', 202));
        }
        quiz.totalQuestions-=1; 
        quiz.passingMarks=( (quiz.maxMarks-que.marks)*35)/100; 
        quiz.maxMarks-=que.marks; 
        
        // Remove the questionId from the questions array using $pull
        quiz.questions.pull(queId);
        await quiz.save(); 
        return res.status(200).json({ message: 'Questions deleted successfully', quiz });
     }
     catch(error){
        return next(new ResponseHandler('Failed to add question', error));
     }
}

export const getque=async(req,res,next)=>{
    const queId=req.params.id; 
    const user=req.user; 
    console.log(user);
     try{
        const quiz = await Quiz.find({author:user._id});

        if (!quiz) {
            return next(new ResponseHandler('You Cant Do This', 202));
        }

        const que = await Question.findById({_id:queId});
        if (!que) {
            return next(new ResponseHandler('Question not found', 202));
        } 
       
        return res.status(200).json({que});
     }
     catch(error){
        return next(new ResponseHandler('Failed to fetch question', error));
     }
}