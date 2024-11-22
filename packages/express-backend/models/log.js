import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true,
        trim: true
    },
    logEncrypted: {
        type: String,
        required: true
    }
});

export default LogSchema;

/**
 *  --Encrypted Schema--
 *   sleep: Number,
 *   eat: Number,
 *   exercise: Boolean,
 *   relationships: String,
 *   time: Date
 */
