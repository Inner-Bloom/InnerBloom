import userModel from "../models/user.js";
import { createCipheriv, createDecipheriv } from "crypto";
import dotenv from "dotenv";
import { spawn } from "child_process";

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

            const sentLog = { time: log.time, logEncrypted: encrypted };

            return userModel.findByIdAndUpdate(result[0]._id, {
                logs: [...result[0].logs, sentLog]
            });
        });
    }
}

function getLogs(userName, day) {
    const user = findUserByUsername(userName);
    if (user !== undefined) {
        if (day !== undefined) {
            return user.then((result) => {
                const logs = result[0].logs.filter((log) => {
                    return log.time.toLocaleDateString() === day;
                });
                return _decryptLogs(logs);
            });
        } else {
            return user.then((result) => {
                return _decryptLogs(result[0].logs);
            });
        }
    }
}

function _decryptLogs(encryptLogs) {
    return Array.from(encryptLogs, (log) => {
        const decipher = createDecipheriv(algorithm, LOG_KEY, LOG_IV);
        var decrypted =
            decipher.update(log.logEncrypted, "hex", "utf8") +
            decipher.final("utf8");
        return JSON.parse(decrypted);
    });
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
