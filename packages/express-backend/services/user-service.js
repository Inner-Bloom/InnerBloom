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
    const user = findUserById(id);
    if (user !== undefined) {
        log.Time = json.stringify(new Date());
        return userModel.findByIdAndUpdate(userId, {
            logs: [...user.logs, log]
        });
    }
}

function getLogs(userId, day) {
    const user = userModel.findById(userId);
    if (user !== undefined) {
        if (day !== undefined) {
            return user.then((result) => {
                return result.logs.filter((log) => {
                    console.log(log.Time.toLocaleDateString());
                    console.log(day);
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
