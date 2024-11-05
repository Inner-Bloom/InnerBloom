import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const creds = [];



export function registerUser(req, res) {
    const { username, pwd } = req.body; // from form

    if (!username || !pwd) {
        res.status(400).send("Bad request: Invalid input data.");
    } else if (creds.find((c) => c.username === username)) {
        res.status(409).send("Username already taken");
    } else {
        bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(pwd, salt))
        .then((hashedPassword) => {
            generateAccessToken(username).then((token) => {
            console.log("Token:", token);
            res.status(201).send({ token: token });
            creds.push({ username, hashedPassword });
            });
        });
    }
}

export function loginUser(req, res) {
    const { username, pwd } = req.body; // from form
    const retrievedUser = creds.find(
      (c) => c.username === username
    );
  
    if (!retrievedUser) {
      // invalid username
      res.status(401).send("Unauthorized");
    } else {
      bcrypt
        .compare(pwd, retrievedUser.hashedPassword)
        .then((matched) => {
          if (matched) {
            generateAccessToken(username).then((token) => {
              res.status(200).send({ token: token });
            });
          } else {
            // invalid password
            res.status(401).send("Unauthorized");
          }
        })
        .catch(() => {
          res.status(401).send("Unauthorized");
        });
    }
  }

export function authenticateUser(req, res, next) {
    const authHeader = req.headers["authorization"];
    //Getting the 2nd part of the auth header (the token)
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token received");
        res.status(401).end();
    } else {
        jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (error, decoded) => {
            if (decoded) {
            next();
            } else {
            console.log("JWT error:", error);
            res.status(401).end();
            }
        }
        );
    }   
}  


function generateAccessToken(username) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { username: username },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" },
        (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
}