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

//posts
const UserSchemaPosts = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  title: String,
  job_type: String,
  pay_rate_per_hr_dollar: Number,
  skills: [{ type: String }],
  liked_by: [{ type: String }],
  viewed_by: [{ type: String }],
  id: Number,
  user_id: String,
  post_by_username: String,
  post_by_fullname: String,
  post_date: String,
  comments: [{ type: String }],
});

const Post = mongoose.model("posts", UserSchemaPosts);

Post.createCollection()
  .then((col) => {
    console.log("Collection", "Created");
  })
  .catch((err) => {
    console.log(err);
  });

// Post.create([{
//   title: "Full Stack Developer",
//   description: "For a client project Full Stack Developer is required",
//   location: "Kathmandu",
//   job_type: "Full Time",
//   pay_rate_per_hr_dollar: 100.0,
//   skills: ["PHP", "JS", "HTML"],
//   liked_by: ["test111", "test1", "test123"],
//   viewed_by: ["test111", "test1", "test123"],
//   id: 2,
//   user_id: 1,
//   post_by_username: "test123",
//   post_by_fullname: "Royal Shrestha",
//   post_date: "2023-06-10T09:24:07.659034",
//   comments: [],
// },
// {
//   title: "AI/ML Developer Required",
//   description: "For a client project AI/ML Developer is required",
//   location: "Bhairahawa",
//   job_type: "Full Time",
//   pay_rate_per_hr_dollar: 69.0,
//   skills: ["PHP", "JS", "HTML"],
//   liked_by: ["test111", "test1", "test123"],
//   viewed_by: ["test111", "test1", "test123"],
//   id: 3,
//   user_id: 2,
//   post_by_username: "test321",
//   post_by_fullname: "Prajol Ghimire",
//   post_date: "2023-06-10T21:51:10.643105",
//   comments: [],
// },
// {
//   title: "PHP Developer Required",
//   description: "For a client project PHP Developer is required",
//   location: "Kathmandu",
//   job_type: "Full Time",
//   pay_rate_per_hr_dollar: 10.0,
//   skills: ["PHP", "JS", "HTML"],
//   liked_by: ["test111", "test1", "test123"],
//   viewed_by: ["test111", "test1", "test123"],
//   id: 4,
//   user_id: 3,
//   post_by_username: "test111",
//   post_by_fullname: "Prabin Joshi",
//   post_date: "2023-06-10T21:53:40.698655",
//   comments: [],
// },

// ]).then(() => {
//   console.log("Posts created");
// });

//---POSTS ENDS

const User = mongoose.model("user", userSchema);
User.createCollection()
  .then((col) => console.log("Collection", " created"))
  .catch((err) => console.log(err));


// http://localhost:5000 then this function will be called
app.get("/", (req, res) => {
  res.status(200).send("This is response from DB");
});

//read file and send content of files as response
app.get("/api/v1/posts",  (req, res) => {
  const posts = fs.readFileSync("./data/posts.json", "utf-8").toString();
  res.status(200).send(posts);
});

app.get("/api/v1/user", async (req, res) => {
 
  // const user = fs.readFileSync("./data/user.json", "utf-8").toString();
  const user= await User.find({id: 1});
  res.status(200).send(user[0]);
});

app.post("/api/v1/user", async (req, resp)=>{
  //const id= req.query.id;
  const lastUser = await User.findOne({}, null, { sort: { id: -1 } });

  let id = 1;
  if (lastUser) {
    id = lastUser.id + 1;
  }
const newUser={
    
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
    };
    User.create(newUser).then((createdUser)=>{console.log("User Created");
    resp.status(200).send(createdUser);
  });
});
app.listen(PORT, () => {
  console.log("App is running on port" + PORT);
});
