const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

router.get("/sharebook", function (req, res) {
  res.render("sharebook");
});

router.post("/sharebook", function (req, res) {
  //path to where we are supposed to store the books.
  const filePath = path.join(__dirname, "..", "data", "books.json");
  const book = req.body; //fetch all data from the form.
  book.id = uuid.v4(); //generate unique ids for every book.
  //read the data that is in the filepath
  const fileData = fs.readFileSync(filePath);
  //parse the data from the file path
  const existingData = JSON.parse(fileData);
  //add the new book to the file path.
  existingData.push(book);
  //write the file path.
  fs.writeFileSync(filePath, JSON.stringify(existingData));
  //redirect to another to avoid form resubmission when the page is refreshed.
  res.redirect("/success");
});

router.get("/success", function (req, res) {
  res.render("success");
});

router.get("/findbook", function (req, res) {
  const filePath = path.join(__dirname, "..", "data", "books.json");

  let order = req.query.order;
  let nextOrder = "desc";

  const fileData = fs.readFileSync(filePath);
  const existingData = JSON.parse(fileData);

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if(order === 'desc'){
    nextOrder = 'asc'
  }

  existingData.sort(function (bookA, bookB) {
    if (
      (order === "asc" && bookA.title > bookB.title) ||
      (order === "desc" && bookB.title > bookA.title)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("findbook", {
    numberOfBooks: existingData.length,
    books: existingData,
    nextOrder:nextOrder
  });
});

router.get("/findbook/:id", function (req, res) {
  //get the unique id
  const bookId = req.params.id;
  const filePath = path.join(__dirname, "..", "data", "books.json");
  const fileData = fs.readFileSync(filePath);
  const numberOfBooks = JSON.parse(fileData);
  //loop through all the books to fine the book with the same id as the one found above
  for (const book of numberOfBooks) {
    if (book.id === bookId) {
      return res.render("book-details", { book: book });
    }
  }
  res.status(404).render("404");
});

module.exports = router;
