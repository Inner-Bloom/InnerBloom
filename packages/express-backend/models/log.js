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
    time: Date,
    logEncrypted: String
});

export default LogSchema;
