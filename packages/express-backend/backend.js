import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js"

dotenv.config();
const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .catch((error) => console.log(error));

const app = express()
const port = 8000;

app.use(cors())
app.use(express.json())

app.get("/",(req,res) => {
    res.send("Hello World!");
});

function randomId(){
  //This could result in a non-unique id but Dr. Kubiak said it's fine for this assignment
  return Math.floor((Math.random() * (10 ** 6))).toString(); //6 random digets
}

app.get("/users",(req,res) => {
  const name = req.query.name;
  const job = req.query.job;
  userService.getUsers(name,job)
  .then((users) => {
    if(users === undefined){
      res.status(404).send("Resource not found.")
    }else{
      res.send(users);
    }})
  .catch((error) => {console.log(error);});
});

app.get("/users/:id",(req,res)=> {
  const id = req.params.id;
  userService.findUserById(id)
  .then((result) => { 
    if (result === undefined) {
    res.status(404).send("Resource not found.")
  } else {
    res.send(result);
  }})
  .catch((error) => {console.log(error);});
});

app.post("/users",(req,res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd)
  .then((user) => {res.status(201).send(user);})
  .catch((error) => {console.log(error);});
});

app.delete("/users/:id",(req,res) => {
  const idToDelete = req.params.id;
  userService.deleteUserById(idToDelete)
    .then((result) => {
      console.log(result)
      if(result !== undefined){
        res.status(204).send()
      }else{
        res.status(404).send("Resouce not found")
      }
    })
    .catch((error) => {console.log(error);});
  });

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`);
});
