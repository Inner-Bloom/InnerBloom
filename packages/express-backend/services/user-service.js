import userModel from "../models/user.js";
import { spawn } from "child_process";

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
                return result[0].logs;
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

//calling analytics.py to run the analytics
function getAnalytics() {
    return new Promise((resolve, reject) => {
        const pyProg = spawn("python", ["analytics.py"]);

        // pyProg.stdout.on('data', (data) => {
        //     console.log(`Output: ${data.toString()}`);
        // });

        // pyProg.stderr.on('data', (data) => {
        //     console.error(`Error: ${data.toString()}`);
        // });

        pyProg.on("close", (code) => {
            if (code === 0) {
                resolve("Analytics is running");
            } else {
                reject(`Process exited with code ${code}`);
            }
        });
    });
}

export default {
    addUser,
    getUsers,
    findUserByUsername,
    deleteUserByUsername,
    addLog,
    getLogs,
    getAnalytics
};
