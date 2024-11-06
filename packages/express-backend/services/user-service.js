import userModel from "../models/user.js";

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
    const user = findUser({ username: name });
    if (user !== undefined) {
        return user.then((result) => {
            log.time = new Date();

            return userModel.findAndUpdate({ username: name }, {
                logs: [...result.logs, log]
            });
        });
    }
}

function getLogs(userName, day) {
    const user = userModel.findUserByUsername(userName);
    if (user !== undefined) {
        if (day !== undefined) {
            return user.then((result) => {
                return result.logs.filter((log) => {
                    return log.time.toLocaleDateString() === day;
                });
            });
        } else {
            return user.then((result) => {
                return result.logs;
            });
        }
    }
}

function findUserByUsername(name) {
    return userModel.find({ username: name });
}

function deleteUserByUsername(name) {
    return userModel.findAndDelete( {username: name });
}

export default {
    addUser,
    getUsers,
    findUserByUsername,
    deleteUserByUsername,
    addLog,
    getLogs
};
