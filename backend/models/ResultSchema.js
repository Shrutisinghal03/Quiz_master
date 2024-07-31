import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    rightAnswers: {
        type: Number,
        required: true
    },
    wrongAnswers: {
        type: Number,
        required: true
    },
    unanswered: {
        type: Number,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    passingMarks: {
        type: Number,
        required: true
    },
    isPassed: {
        type: Boolean,
        required: true
    },
    remarks: {
        type: String,
        default: ""
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Result = mongoose.model("Result", resultSchema);

export default Result;
