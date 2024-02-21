const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExists = (username) =>{
    letuserwithsamename = users.filter((user) => {
        user.username === username;
    });
    if(letuserwithsamename.length> 0){
        return true;
    }
    else{
        return false;
    }
}


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const ISBN = req.params.isbn;
  res.send(books[ISBN]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here

  const authorName = req.params.author;
  const matchingBooks = [];

  for (const [isbn, book] of Object.entries(books)) {
    if (book.author === authorName) {
      matchingBooks.push({ isbn, ...book });
    }
  }

  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    res.status(404).json({ message: "No books found for the author: " + authorName });
  }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const titleName = req.params.title;
  const matchingBooks = [];

  for (const [isbn, book] of Object.entries(books)) {
    if (book.title === titleName) {
      matchingBooks.push({ isbn, ...book });
    }
  }

  if (matchingBooks.length > 0) {
    res.status(200).json(matchingBooks);
  } else {
    res.status(404).json({ message: "No books found for the author: " + titleName });
  }});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const booktitle = req.params.title;
  const bookreview = [];

  for(let [isbn, review] of Object.entries(books)){
    
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
