
const path = require("path");

const express = require("express");

const app = express();

const defaultRoutes = require('./routes/default')
const booksRoutes = require('./routes/books')

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/",defaultRoutes);
app.use("/",booksRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

app.use(function (req, res) {
  res.status(404).render("404");
});

// app.use(function (error, req, res, next) {
//   res.status(500).render("500");
// });

app.listen(3000);
