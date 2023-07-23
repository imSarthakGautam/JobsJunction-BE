const express = require("express");
const fs = require("fs");
const cors = require("cors");
const mongoose = require("mongoose"); //database

const app = express();
app.use(cors());
const PORT = 5000;

//mongodb connection string

const mongoDbURL = "mongodb://localhost:27017/lec";
mongoose.connect(mongoDbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  fullname: String,
  title: String,
  skills: [{ type: String }],
  address: String,
  job_type: String,
  id: Number,
  is_active: Boolean,
  followers: [{ type: String }],
  followings: [{ type: String }],
});

const User = mongoose.model("user", userSchema);
User
  .createCollection()
  .then((col) => console.log("Collection", col, " created"))
  .catch((err) => console.log(err));

User.create({
  email: "test@gamil.com",
  username: "sarthak",
  fullname: "Sarthak Gautam",
  title: "Software Developer",
  skills: ["Js", "React", "Java"],
  address: "kathmandu, Nepal",
  job_type: "Full time",
  id: 1,
  is_active: true,
  followers: ["username12", "username 123", "username1234"],
  followings: ["username12", "username 123", "username1234"],
}).then(() => {
    console.log("User created");
});

// http://localhost:5000 then this function will be called
app.get("/", (req, res) => {
  res.status(200).send("This is response from DB");
});

//read file and send content of files as response
app.get("/api/v1/posts", (req, res) => {
  const posts = fs.readFileSync("./data/posts.json", "utf-8").toString();
  res.status(200).send(posts);
});

app.get("/api/v1/user", (req, res) => {
  const user = fs.readFileSync("./data/user.json", "utf-8").toString();
  res.status(200).send(user);
});

app.listen(PORT, () => {
  console.log("App is running on port" + PORT);
});
