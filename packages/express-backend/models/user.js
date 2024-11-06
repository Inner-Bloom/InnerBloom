import mongoose from "mongoose";
import LogSchema from "./log.js";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        pwd: {
            type: String,
            required: true
        },
        logs: [LogSchema]
    },
    { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;
