
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Mongoose, default: mongoose } = require("mongoose");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(cors());
mongoose.connect(
  "mongodb+srv://vissamsettykalyan:kalyan9b@cluster0.qf0o0ao.mongodb.net/todoapp"
);
const user = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  secret_id: String,
});

const todo = new mongoose.Schema({
  title: String,
  description: String,
  img: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  done: Boolean
});

const Users = mongoose.model("Users", user);
const Todos = mongoose.model("Todos", todo);


const authenticateJWT = (req,res,next) =>{
  const authHeader = req.header("Authorization");
  console.log(authHeader)
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        console.log("kjh")
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}
app.get("/", (req, res) => {
  res.send("Hi from Express");
});
app.get('/extract',authenticateJWT,(req,res)=>{
  // const {token} = req.headers
  // const validToken = token.split(' ')[1]
  try{
    // console.log(req.header("Authorization"));
    // if(req.header("Authorization") == undefined){
    //   return res.status(403).json({
    //     msg:"Invalid"
    //   })
    // }
    const tokenData = jwt.verify(req.header("Authorization").split(' ')[1], process.env.SECRET);
    return res.json(tokenData);
  }catch(error){
    console.log(error)
  }
  return res.status(403)
  
})
app.post("/signup", async (req, res) => {
  try {
    const user_data = new Users(req.body);
    const savedUser = await user_data.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/login", async (req, res) => {
  try{
    const { email, password } = req.body;
    const respUser = await Users.findOne({ email, password });
    
    if(respUser){
      const token = jwt.sign(
        {
          username: respUser.username,
          email: respUser.email,
        },
        process.env.SECRET
      );
      res.status(200).send({username:respUser.username,email:respUser.email,token})
    }
    else{
      res.status(403).send(false)
    }
  }catch(error){
    res.status(500).json({ error: error });
  }

});

app.post("/addtodo",authenticateJWT,async (req,res)=>{
  console.log("in add todo")
  try{
    const userRecord = await Users.findOne({email:req.user["email"]}).exec();
    const todoData = { ...req.body, author: userRecord};
    const todoRef = new Todos(todoData);
    const savedTodo = await todoRef.save();
    if (savedTodo) {
      
      res.status(200).json(savedTodo);
    }
  }catch(error){
    res.status(403).send(error)
  }
  
})
app.get("/getTodos",authenticateJWT,async (req,res)=>{
  const userRecord = await Users.findOne({ email: req.user["email"] }).exec();
  const todoOfUser = await Todos.find({author:userRecord})
  res.status(200).json(todoOfUser)
})

app.put("/updateTodo/:id",authenticateJWT,async(req,res)=>{
  console.log("kjbv")
  const todoRecord= await Todos.findOne({_id:req.params.id}).exec()
  if(todoRecord){
    todoRecord.done = !todoRecord.done;
    await todoRecord.save()
    res
      .status(200)
      .json({ msg: "Updated successfuly", done: !todoRecord.done });
  }
  else{
    res.status(404).send({
      msg:"Can't find todo"
    })
  }
})

app.delete("/deleteTodo/:id",authenticateJWT,async(req,res)=>{
  try{
    const id = req.params.id
    const result = await Todos.deleteOne({_id:id})
    if(result.deletedCount === 1){
      return res.status(200).json({ message: "Record deleted successfully" });
    }
    else{
      return res.status(404).json({ message: "Record not found" });
    }
  }catch(err){
    return res.status(500).json({ message: "An error occurred" });
  }
});
app.listen(process.env.BACKEND_PORT, () =>
  console.log("Server running from: ", process.env.BACKEND_PORT)
);

app.use((req, res, next) => {
  res.status(404).send();
});
