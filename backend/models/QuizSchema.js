import mongoose from "mongoose";
import { questionSchema } from "./questionSchema.js";

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    totalQuestions: {
        type: Number,
        default:0
    },
    negativeMark: {
        type: Number,
        required: true,
    },
    maxMarks: {
        type: Number,
        default:0
    },
    passingMarks: {
        type: Number,
        default:0
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    isPublished: {
        type: Boolean,
        default: false,
    },
    publishedDate:{
        type:Date
    },
    difficultyLevel: {
        type: String,
        enum:["Easy","Moderate","Hard"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, // Duration in minutes
        required: true,
    },
    enrolledUsers: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'student',
        },
        status: {
            type: String,
            enum: ['enrolled', 'started', 'completed'],
            default: 'enrolled'
        },
        score: {
            type: Number,
        }
    }],
    analytics: {
        totalAttempts: {
            type: Number,
            default: 0,
        },
        averageScore: {
            type: Number,
            default: 0,
        },
        passRate: {
            type: Number,
            default: 0,
        }
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;