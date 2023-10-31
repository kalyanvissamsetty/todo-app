
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
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

app.post("/signup", async (req, res) => {
  try {
    //const { title } = req.body;
    console.log(req.body)
    const user_data = new Users(req.body);
    const savedUser = await user_data.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/login", (req, res) => {});
app.listen(process.env.BACKEND_PORT, () =>
  console.log("Server running from: ", process.env.BACKEND_PORT)
);

app.use((req, res, next) => {
  res.status(404).send();
});
