import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";
import { registerUser, authenticateUser, loginUser } from "./auth.js";
import path from "path";

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

app.get("/users/:username", authenticateUser, (req, res) => {
    const username = req.params.username;
    userService
        .findUserByUsername(username)
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
app.get("/users/:username/logs", authenticateUser, (req, res) => {
    const username = req.params.username;
    const day = req.query.day;
    userService
        .getLogs(username, day)
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

app.post("/users/:username/logs", authenticateUser, (req, res) => {
    const logToAdd = req.body;
    const username = req.params.username;
    userService
        .addLog(logToAdd, username)
        .then((log) => {
            res.status(201).send(log);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.delete("/users/:username", authenticateUser, (req, res) => {
    const usernameToDelete = req.params.username;
    userService
        .deleteUserByUsername(usernameToDelete)
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

//new endpoint to run analytics on the logs
app.get("/analytics", (req, res) => {
    console.log("running analytics");
    userService
        .getAnalytics()
        .then((result) => {
            if (result === undefined) {
                res.status(404).send("Resource not found.");
            } else {
                console.log(result);
                res.sendFile(path.resolve("figure.html"));
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error running analytics");
        });
});

// app.get("/users/:username/logs/analytics", authenticateUser, (req, res) => {
//     const username = req.params.username;
//     userService
//         .getAnalytics(username)
//         .then((result) => {
//             if (result === undefined) {
//                 res.status(404).send("Resource not found.");
//             } else {
//                 res.send(result);
//             }
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// });

app.listen(process.env.PORT || port, () => {
    console.log(`REST API is listening at port:${port}`);
});
