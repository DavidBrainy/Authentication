const express = require("express");
const {postsRouter} = require("./modules/posts/posts.route")
const {dbConnect} = require("./config/dbConnect");
const {authRouter} = require ("./modules/users/auth.route")

const app = express();

app.use(express.json())

app.all("/", (req, res) => {
    res.status(200).send("Welcome to my server. Use /posts to get all posts")
});

app.use ("/auth", authRouter);
app.use ("/posts", postsRouter);

async function start(){
 await dbConnect();

    app.listen(4000, () => {
        console.log("🚀server running on http://localhost:4000");
    });
}

start();