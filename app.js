const fs = require("fs");

const path = require("path");

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/sharebook", function (req, res) {
  res.render("sharebook");
});

app.post("/sharebook", function (req, res) {
  const filePath = path.join(__dirname, "data", "books.json");
  const book = req.body;
  const fileData = fs.readFileSync(filePath);
  const existingData = JSON.parse(fileData);
  existingData.push(book);
  fs.writeFileSync(filePath, JSON.stringify(existingData));

  res.redirect("/success");
});

app.get("/success", function (req, res) {
  res.render("success");
});

app.get("/findbook", function (req, res) {
  const filePath = path.join(__dirname, "data", "books.json");

  const fileData = fs.readFileSync(filePath);
  const existingData = JSON.parse(fileData);

  res.render("findbook", { numberOfBooks: existingData.length, books:existingData });
});

app.listen(3000);
