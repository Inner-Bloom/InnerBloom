import userModel from "../models/user.js";

function getUsers(name) {
    let promise;
    if (name === undefined) {
        promise = userModel.find();
    } else {
        promise = findUserByName(name);
    }
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
    // TODO: Need to check if the user has already submitted a log today
    const user = findUserById(id);
    if (user !== undefined) {
        return userModel.findByIdAndUpdate(userId, {
            logs: [...user.logs, log]
        });
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
    addLog
};
