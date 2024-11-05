import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";
import { registerUser, authenticateUser, loginUser } from "./auth.js"

dotenv.config();
const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);

mongoose.connect(MONGO_CONNECTION_STRING).catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());



// DEBUG FUNCTION ONLY, REMOVE IN REAL CODE
app.get("/users", (req, res) => {
    const name = req.query.name;
    userService
        .getUsers(name)
        .then((users) => {
            if (users === undefined) {
                res.status(404).send("Resource not found.");
            } else {
                res.send(users);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});
// DEBUG FUNCTION ONLY, REMOVE IN REAL CODE
app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userService
        .addUser(userToAdd)
        .then((user) => {
            res.status(201).send(user);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/signup", registerUser);
app.post("/login", loginUser);


app.get("/users/:id" , authenticateUser, (req, res) => {
    const id = req.params.id;
    userService
        .findUserById(id)
        .then((result) => {
            if (result === undefined) {
                res.status(404).send("Resource not found.");
            } else {
                res.send(result);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});
app.get("/users/:id/logs", authenticateUser, (req, res) => {
    const id = req.params.id;
    const day = req.query.day;
    userService
        .getLogs(id, day)
        .then((result) => {
            if (result === undefined) {
                res.status(404).send("Resource not found.");
            } else {
                console.log(result);
                res.send(result);
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

app.post("/users/:id/logs", authenticateUser, (req, res) => {
    const logToAdd = req.body;
    const id = req.params.id;
    userService
        .addLog(logToAdd, id)
        .then((log) => {
            res.status(201).send(log);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.delete("/users/:id", authenticateUser, (req, res) => {
    const idToDelete = req.params.id;
    userService
        .deleteUserById(idToDelete)
        .then((result) => {
            if (result !== undefined) {
                res.status(204).send();
            } else {
                res.status(404).send("Resouce not found");
            }
        })
        .catch((error) => {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
