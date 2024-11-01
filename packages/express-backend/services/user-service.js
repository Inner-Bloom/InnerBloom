import userModel from "../models/user.js";

function getUsers(name) {
    let promise;
    if (name === undefined) {
        promise = userModel.find();
    } else {
        promise = findUserByName(name);
    }
    return promise;
}

function findUserById(id) {
    return userModel.findById(id);
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function addLog(log, userId) {
    const user = findUserById(userId);
    if (user !== undefined) {
        return user.then((result) => {
            log.Time = new Date();

            return userModel.findByIdAndUpdate(userId, {
                logs: [...result.logs, log]
            });
        });
    }
}

function getLogs(userId, day) {
    const user = userModel.findById(userId);
    if (user !== undefined) {
        if (day !== undefined) {
            return user.then((result) => {
                return result.logs.filter((log) => {
                    return log.Time.toLocaleDateString() === day;
                });
            });
        } else {
            return user.then((result) => {
                return result.logs;
            });
        }
    }
}

function findUserByName(name) {
    return userModel.find({ name: name });
}

function deleteUserById(id) {
    return userModel.findByIdAndDelete(id);
}

export default {
    addUser,
    getUsers,
    findUserById,
    findUserByName,
    deleteUserById,
    addLog,
    getLogs
};
