import ResponseHandler from '../middlewares/error.middleware.js';
import admin from '../models/AdminSchema.js';
import Quiz from '../models/quizSchema.js'; 
import { Question } from '../models/questionSchema.js';
// Create a new quiz
export const createQuiz = async (req, res, next) => {
    const { name, description, negativeMark, questions, difficultyLevel, isPublished, startTime, endTime, duration } = req.body;
    const user = req.user;
    console.log(user);
     console.log()
    try {
      const adminUser = await admin.findById(user._id);
      console.log(user._id);
      if (!adminUser) {
        return next(new ResponseHandler('You are not authorized to do this work'));
      }
  
      let qarr = [];
      let maxMarks = 0;
      let totalQuestions = 0;
  
      const questionPromises = questions.map(async (q) => {
        const newQuestion = new Question({
          text: q.question,
          options: q.options,
          correctOption: q.correctOption,
        });
        const savedQuestion = await newQuestion.save();
        qarr.push(savedQuestion._id);
        totalQuestions += 1;
        maxMarks += 5; // Assuming `q.marks` exists in the question object
      });
  
      await Promise.all(questionPromises);
  
      const passingMarks = (maxMarks * 35) / 100;
  
      const quiz = new Quiz({
        name,
        description,
        totalQuestions,
        negativeMark,
        maxMarks,
        passingMarks,
        questions: qarr,
        difficultyLevel,
        isPublished,
        startTime,
        endTime,
        duration,
        author: user._id,
      });
      const response = await quiz.save();

      const qstn= qarr.map(async (q) => {
        const que= await Question.findById(q); 
        if(que){
            que.quizId=response._id; 
            await que.save(); 
        }
 // Assuming `q.marks` exists in the question object
      });
  
      await Promise.all(qstn);

    
      return res.status(201).json({ message: 'Quiz successfully created', quiz: response });
  
    } catch (error) {
      return next(new ResponseHandler('Some error in creating quiz', error));
    }
  };
  

// Delete a quiz by ID
export const deleteQuiz = async (req, res, next) => {
    const quizId = req.params.id; 
    const user = req.user; 

    try {
      const adminUser=await admin.findById(user._id); 
      if(!adminUser){
        return next(new ResponseHandler('You are not authorized to do this work'));
      }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return next(new ResponseHandler('Quiz not found', 202));
        }

        if (quiz.author.toString() !== user._id.toString()) {
            return next(new ResponseHandler('You cannot delete this resource', 203));
        }

        if (quiz.isPublished) {
            return next(new ResponseHandler('You cannot delete a published quiz', 200));
        }

        await quiz.delete();
        return res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        return next(new ResponseHandler('Failed to delete quiz', error));
    }
};

// Get a single quiz by ID
export const getQuizById = async (req, res, next) => {
    const quizId = req.params.id;

    try {
        const quiz = await Quiz.findById(quizId).populate('author');
        if (!quiz) {
            return next(new ResponseHandler('Quiz not found', 202));
        }
        return res.status(200).json({ quiz });
    } catch (error) {
        return next(new ResponseHandler('Failed to fetch quiz', error));
    }
};

// Get quizzes created by the current user
export const getMyQuizzes = async (req, res, next) => {
    const user = req.user;

    try {
      const adminUser=await admin.findById(user._id); 
      if(!adminUser){
        return next(new ResponseHandler('You are not authorized to do this work'));
      }
        const quizzes = await Quiz.find({ author: user._id });
        return res.status(200).json({ quizzes });
    } catch (error) {
        return next(new ResponseHandler('Failed to fetch quizzes', error));
    }
};

// Get all published quizzes
export const getAllQuizzes = async (req, res, next) => {
    try {
        const quizzes = await Quiz.find({ isPublished: true });
        return res.status(200).json({ quizzes });
    } catch (error) {
        return next(new ResponseHandler('Failed to fetch quizzes', error));
    }
};

// Publish a quiz
export const publishQuiz = async (req, res, next) => {
    const quizId = req.params.id;
     const user=req.user; 
    try {
      const adminUser=await admin.findById(user._id); 
      if(!adminUser){
        return next(new ResponseHandler('You are not authorized to do this work'));
      }
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return next(new ResponseHandler('Quiz not found', 202));
        }

        quiz.isPublished = true;
        const result = await quiz.save();
        return res.status(200).json({ message: 'Quiz published successfully', quiz: result });
    } catch (error) {
        return next(new ResponseHandler('Failed to publish quiz', error));
    }
};

// Update a quiz by ID
export const updateQuiz = async (req, res, next) => {
    const user = req.user;
    const quizId = req.params.id;

    try {
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
        Object.assign(quiz, req.body);
        await quiz.save();

        res.status(200).json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
        return next(new ResponseHandler('Failed to update quiz', error));
    }
};
export const getAuthorQuiz = async (req, res, next) => {
    const id=req.params.id; 

    try {
      const adminUser=await admin.findById(id); 
      if(!adminUser){
        return next(new ResponseHandler('You are not authorized to do this work'));
      }
        const quizzes = await Quiz.find({ author: id });
        return res.status(200).json({ quizzes });
    } catch (error) {
        return next(new ResponseHandler('Failed to fetch quizzes', error));
    }
};