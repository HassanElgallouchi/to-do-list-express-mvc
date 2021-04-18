const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const port = process.env.PORT;

app.use(express.static("src"));

app.use(express.urlencoded({ extended: false}));
const ejs = require("ejs");
const router = require("./routers");

app.engine("ejs", ejs.renderFile);


app.set("views", __dirname + "/views");
// app.use(express.static(path.join(__dirname,"src")));

app.use(router);


app.listen(port, () => {
    console.log(`Work on port ${port}`);
})