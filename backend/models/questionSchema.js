import mongoose from "mongoose"; 
const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    options: [{
        type: String,
        required: true,
    }],
    correctOption: {
        type: Number, // Index of the correct option in the options array
        required: true,
    },
    marks: {
        type: Number,
        // required: true,
    },
    quizId:{
         type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }
});

const Question = mongoose.model("Question", questionSchema);

export { Question, questionSchema };
