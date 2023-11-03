
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
});

const Users = mongoose.model("Users", user);
const Todos = mongoose.model("Todos", todo);
app.get("/", (req, res) => {
  res.send("Hi from Express");
});
app.get('/extract',(req,res)=>{
  // const {token} = req.headers
  // const validToken = token.split(' ')[1]
  try{
    console.log(req.header("Authorization"));
    if(req.header("Authorization") == undefined){
      return res.status(403).json({
        msg:"Invalid"
      })
    }
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
        process.env.SECRET,
        { expiresIn: "1800s" }
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
app.listen(process.env.BACKEND_PORT, () =>
  console.log("Server running from: ", process.env.BACKEND_PORT)
);

app.use((req, res, next) => {
  res.status(404).send();
});
