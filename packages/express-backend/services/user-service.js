import userModel from "../models/user.js";
import { createCipheriv, createDecipheriv } from "crypto";
import dotenv from "dotenv";

dotenv.config();
const { LOG_KEY, LOG_IV } = process.env;
const algorithm = "aes256";

function getUsers(name) {
    let promise;

    if (name === undefined) {
        promise = userModel.find();
    } else {
        promise = findUserByUsername(name);
    }
    return promise;
}

function addUser(user) {
    user.logs = []; // Assert we aren't adding logs through this endpoint
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function addLog(log, userName) {
    const user = findUserByUsername(userName);
    if (user !== undefined) {
        return user.then((result) => {
            log.time = new Date();
            const cipher = createCipheriv(algorithm, LOG_KEY, LOG_IV);
            const encrypted =
                cipher.update(JSON.stringify(log), "utf8", "hex") +
                cipher.final("hex");
            log.logEncrypted = encrypted;

            return userModel.findByIdAndUpdate(result[0]._id, {
                logs: [...result[0].logs, log]
            });
        });
    }
}

function getLogs(userName, day) {
    const user = findUserByUsername(userName);
    if (user !== undefined) {
        if (day !== undefined) {
            return user.then((result) => {
                return result[0].logs.filter((log) => {
                    return log.time.toLocaleDateString() === day;
                });
            });
        } else {
            return user.then((result) => {
                return Array.from(result[0].logs, (log) => {
                    if (log.logEncrypted != null) {
                        //TODO Remove this branching once all logs are encrypted
                        const decipher = createDecipheriv(
                            algorithm,
                            LOG_KEY,
                            LOG_IV
                        );
                        var decrypted =
                            decipher.update(log.logEncrypted, "hex", "utf8") +
                            decipher.final("utf8");
                        return JSON.parse(decrypted);
                    } else {
                        return log;
                    }
                });
            });
        }
    }
}

function findUserByUsername(name) {
    return userModel.find({ username: name });
}

function deleteUserByUsername(name) {
    return userModel.findAndDelete({ username: name });
}

export default {
    addUser,
    getUsers,
    findUserByUsername,
    deleteUserByUsername,
    addLog,
    getLogs
};
