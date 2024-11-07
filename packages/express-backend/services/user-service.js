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

export default {
    addUser,
    getUsers,
    findUserByUsername,
    deleteUserByUsername,
    addLog,
    getLogs
};
