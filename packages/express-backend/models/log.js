import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true,
        trim: true
    },
    sleep: Number,
    eat: Number,
    exercise: Boolean,
    relationships: String,
    time: Date
});

export default LogSchema;
