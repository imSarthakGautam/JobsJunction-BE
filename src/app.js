const express = require("express");
const fs= require("fs");
const cors = require("cors");

const app= express();
app.use(cors());
const PORT = 5000;

// http://localhost:5000 then this function will be called
app.get("/", (req,res)=>{
    res.status(200).send("This is response from DB");
});

//read file and send content of files as response
app.get("/api/v1/posts", (req,res)=>{
    const posts = fs.readFileSync("./data/posts.json", "utf-8").toString();
    res.status(200).send(posts);
});

app.get("/api/v1/user", (req, res) => {
    const user = fs.readFileSync("./data/user.json", "utf-8").toString();
    res.status(200).send(user);
  });

app.listen(PORT, ()=>{
    console.log("App is running on port" + PORT);
});

